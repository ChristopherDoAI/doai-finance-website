"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/** Render chat text with line breaks and **bold** markdown */
function formatMessage(text: string): ReactNode {
  return text.split("\n").map((line, i, arr) => {
    // Parse **bold** segments within each line
    const parts: ReactNode[] = [];
    let remaining = line;
    let key = 0;
    while (remaining.length > 0) {
      const start = remaining.indexOf("**");
      if (start === -1) {
        parts.push(remaining);
        break;
      }
      const end = remaining.indexOf("**", start + 2);
      if (end === -1) {
        parts.push(remaining);
        break;
      }
      if (start > 0) parts.push(remaining.slice(0, start));
      parts.push(
        <strong key={key++} className="font-semibold">
          {remaining.slice(start + 2, end)}
        </strong>
      );
      remaining = remaining.slice(end + 2);
    }
    return (
      <span key={i}>
        {parts}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "0",
  role: "assistant",
  content:
    "Hi there! 👋 I'm DoAi's AI assistant. I can tell you about our services, answer questions, or help you book a call with the team. What can I help you with today?",
  timestamp: new Date(),
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does it cost?",
  "How quickly can you set it up?",
  "Book a call",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lead capture — driven by AI, saved silently when [LEAD:{...}] marker detected
  const leadSavedRef = useRef(false);

  // Listen for external "open chat" events (e.g. from Hero CTA)
  useEffect(() => {
    const handleOpenChat = () => setOpen(true);
    window.addEventListener("doai:open-chat", handleOpenChat);
    return () => window.removeEventListener("doai:open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingContent("");
    inputRef.current?.focus();

    // Book a call shortcut — only for explicit short booking requests, not general messages mentioning "call"
    const t = text.trim().toLowerCase();
    const isExplicitBooking = t.length < 40 && (t === "book a call" || t === "book" || t === "book call" || (t.startsWith("book") && t.includes("call")) || t === "i want to book");
    if (isExplicitBooking) {
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Great! You can book a free 30-minute strategy call directly on our calendar. Click the button below and choose a time that works for you.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      // Build message history for API (exclude the initial greeting)
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "0")
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingContent(accumulated);
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }

      // Parse and strip [LEAD:{...}] marker if present, then save silently
      const markerIdx = accumulated.indexOf("[LEAD:");
      if (markerIdx !== -1 && !leadSavedRef.current) {
        const rest = accumulated.slice(markerIdx);
        const endIdx = rest.indexOf("]");
        if (endIdx !== -1) {
          try {
            const leadData = JSON.parse(rest.slice(6, endIdx));
            accumulated = accumulated.slice(0, markerIdx).trim();
            leadSavedRef.current = true;
            saveLead(leadData);
          } catch {
            // malformed marker — strip it anyway to keep chat clean
            accumulated = accumulated.slice(0, markerIdx).trim();
          }
        }
      }

      // Finalize: move accumulated text into a proper message
      const finalMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          accumulated ||
          "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, finalMsg]);
      setStreamingContent("");
    } catch (err) {
      console.error("[ChatWidget] Stream error:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting right now. Please try again in a moment, or you can book a call directly using the booking section below.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setStreamingContent("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const saveLead = async (leadData: { name?: string; email?: string; phone?: string; summary?: string }) => {
    try {
      const transcript = messages
        .filter((m) => m.id !== "0")
        .map(({ role, content }) => ({ role, content }));
      await fetch("/api/chat/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          notes: leadData.summary,
          chatTranscript: transcript,
        }),
      });
    } catch (err) {
      console.error("[ChatWidget] Lead save failed:", err);
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="chat-panel fixed bottom-[88px] md:bottom-[104px] xl:bottom-[120px] right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "520px" }}
          role="dialog"
          aria-label="DoAi chat"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm text-text-primary leading-none">
                DoAi Assistant
              </p>
              <p className="text-xs font-body text-text-muted mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online now
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                    D
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed break-words overflow-hidden ${msg.role === "user"
                    ? "bg-accent text-white font-medium rounded-br-sm"
                    : "bg-card border border-border text-text-secondary rounded-bl-sm"
                    }`}
                >
                  {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                  {/* Show booking button when bot mentions booking/call/calendar */}
                  {msg.role === "assistant" &&
                    msg.content.toLowerCase().includes("book") &&
                    (msg.content.toLowerCase().includes("call") ||
                      msg.content.toLowerCase().includes("calendar")) && (
                      <button
                        onClick={scrollToBooking}
                        className="mt-2 w-full h-8 rounded-lg bg-accent text-white text-xs font-display font-semibold hover:bg-accent-light transition-colors"
                      >
                        Book a call →
                      </button>
                    )}
                </div>
              </div>
            ))}

            {/* Streaming message (tokens arriving) */}
            {streamingContent && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                  D
                </div>
                <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm font-body leading-relaxed break-words overflow-hidden bg-card border border-border text-text-secondary">
                  {formatMessage(streamingContent)}
                  <span className="inline-block w-1 h-4 bg-accent/60 animate-pulse ml-0.5 align-text-bottom" />
                </div>
              </div>
            )}

            {/* Loading indicator (before streaming starts) */}
            {loading && !streamingContent && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                  D
                </div>
                <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  className="px-3 py-1.5 rounded-full border border-border text-xs font-body text-text-secondary hover:border-accent hover:text-accent transition-all duration-150"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 focus-within:border-accent/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-sm font-body text-text-primary placeholder-text-muted outline-none min-w-0"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                aria-label="Send message"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            <p className="text-center text-xs font-body text-text-muted mt-2 opacity-50">
              Powered by DoAi
            </p>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 md:w-[72px] md:h-[72px] xl:w-[88px] xl:h-[88px] rounded-full bg-accent text-white shadow-accent-glow hover:bg-accent-light active:scale-95 transition-all duration-150 flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg className="w-5 h-5 md:w-7 md:h-7 xl:w-8 xl:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 md:w-8 md:h-8 xl:w-9 xl:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7 rounded-full bg-red-500 text-white text-xs md:text-sm xl:text-base font-bold flex items-center justify-center border-2 xl:border-[3px] border-base">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

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
    "Hi there! 👋 I'm AutoFlow's AI assistant. I can tell you about our services, answer questions, or help you book a call with the team. What can I help you with today?",
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
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Book a call shortcut
    if (text.toLowerCase().includes("book") || text.toLowerCase().includes("call")) {
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
      }, 600);
      return;
    }

    // v0.2.0 will call /api/chat with Claude API
    // For now: static fallback responses
    const fallbacks: Record<string, string> = {
      services:
        "We build four core AI products: a 24/7 Voice Agent that answers your calls, a Chat Agent for your website, automated Lead Generation into your CRM, and custom Process Automations to eliminate admin. Want to know more about any of these?",
      cost:
        "Pricing depends on which products you need and the volume of calls/chats. Most clients start from £400/month. The best next step is a free strategy call where we'll give you exact numbers for your situation.",
      setup:
        "Most clients are live within 48 hours of our strategy call. We handle all the technical setup — you just need to point your phone number to us and drop a snippet on your website.",
      default:
        "That's a great question! For the most accurate answer, I'd recommend booking a free call with our team — they'll give you specific advice tailored to your business. You can also ask me about our services, pricing, or setup time.",
    };

    const lower = text.toLowerCase();
    let response = fallbacks.default;
    if (lower.includes("service") || lower.includes("offer") || lower.includes("build"))
      response = fallbacks.services;
    else if (lower.includes("cost") || lower.includes("price") || lower.includes("much"))
      response = fallbacks.cost;
    else if (lower.includes("setup") || lower.includes("quick") || lower.includes("fast") || lower.includes("long"))
      response = fallbacks.setup;

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 800);
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

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="chat-panel fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "520px" }}
          role="dialog"
          aria-label="AutoFlow AI chat"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-display font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm text-text-primary leading-none">
                AutoFlow AI
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
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0 mt-0.5">
                    A
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-black font-medium rounded-br-sm"
                      : "bg-card border border-border text-text-secondary rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                  {/* Show booking button in relevant assistant messages */}
                  {msg.role === "assistant" &&
                    msg.content.includes("booking") && (
                      <button
                        onClick={scrollToBooking}
                        className="mt-2 w-full h-8 rounded-lg bg-accent text-black text-xs font-display font-semibold hover:bg-accent-light transition-colors"
                      >
                        Book a call →
                      </button>
                    )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0 mt-0.5">
                  A
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
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-black hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                aria-label="Send message"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            <p className="text-center text-xs font-body text-text-muted mt-2 opacity-50">
              Powered by AutoFlow AI · Claude API in v0.2.0
            </p>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-accent text-black shadow-amber-glow hover:bg-accent-light active:scale-95 transition-all duration-150 flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-base">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}

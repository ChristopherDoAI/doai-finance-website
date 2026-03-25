"use client";

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] pt-[72px] flex items-center">
      <div className="section-container w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column — copy */}
          <div>
            <span
              className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-5"
              style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0 }}
            >
              AI-Powered Business Automation
            </span>

            <h1
              className="font-display font-extrabold text-display-xl text-balance text-text-primary mb-6"
              style={{ animation: "fadeUp 0.55s 80ms ease forwards", opacity: 0 }}
            >
              Smarter automation.{" "}
              <span className="text-text-secondary">
                Built for ambitious businesses.
              </span>
            </h1>

            <p
              className="font-body text-lg text-text-secondary max-w-lg leading-relaxed mb-8"
              style={{ animation: "fadeUp 0.55s 160ms ease forwards", opacity: 0 }}
            >
              DoAi deploys intelligent agents that answer your calls, qualify
              your leads, and book your diary - while you&apos;re on the job, in
              a meeting, or sound asleep.
            </p>

            <div
              style={{ animation: "fadeUp 0.55s 240ms ease forwards", opacity: 0 }}
            >
              <button
                onClick={scrollToBooking}
                className="group inline-flex items-center gap-2 bg-primary text-white rounded-lg px-8 py-4 text-base font-display font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all duration-150"
              >
                Book a free strategy call
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column — interactive chat prompt */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{ animation: "fadeUp 0.6s 300ms ease forwards", opacity: 0 }}
          >
            <div className="relative w-full bg-surface rounded-2xl border border-border overflow-hidden p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-primary">M</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-text-primary">Monty</p>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online now
                  </p>
                </div>
              </div>

              {/* Chat conversation */}
              <div className="bg-white rounded-xl rounded-tl-none p-4 shadow-card max-w-[80%] mb-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Hi! Thanks for calling. I can help you schedule a consultation, answer questions about pricing, or connect you with the team.
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl rounded-tr-none p-4 max-w-[70%] self-end ml-auto mb-4">
                <p className="text-sm text-text-primary leading-relaxed">
                  I&apos;d like to book a free strategy call please.
                </p>
              </div>
              <div className="bg-white rounded-xl rounded-tl-none p-4 shadow-card max-w-[80%] mb-5">
                <p className="text-sm text-text-secondary leading-relaxed">
                  I have availability tomorrow at 10am and 2pm. Which works better for you?
                </p>
              </div>

              {/* Fake input — opens real chatbot on click */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("doai:open-chat"))}
                className="w-full flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all duration-200 cursor-text group"
              >
                <span className="flex-1 text-sm text-text-muted text-left">
                  Ask a question...
                </span>
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white group-hover:bg-primary-dark transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

export default function DarkCTA() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("doai:open-chat"));
  };

  return (
    <section className="bg-primary py-section-lg">
      <div className="section-container text-center">
        <h2 className="font-display font-bold text-display-lg text-base mb-6">
          Discover What DOAI Can Do For Your Business
        </h2>
        <p className="text-base/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(29,51,78,0.8)" }}>
          Stop leaving revenue on the table. Let our AI agents handle your calls,
          qualify your leads, and fill your calendar while you focus on the work
          that matters.
        </p>
        <button
          onClick={openChat}
          className="group inline-flex items-center gap-2 bg-base text-white border-2 border-base rounded-lg px-8 py-4 text-base font-semibold hover:bg-surface-dark hover:border-surface-dark transition-colors duration-200"
        >
          Learn More
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
    </section>
  );
}

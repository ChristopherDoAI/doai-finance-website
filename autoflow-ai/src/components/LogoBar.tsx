export default function LogoBar() {
  const logos = [
    "TechCorp", "Pinnacle", "Vertex", "NovaTrade", "Meridian", "AlphaFlow"
  ];

  return (
    <section className="py-16 border-y border-border">
      <div className="section-container">
        <p className="text-center text-sm font-semibold text-text-muted uppercase tracking-wider mb-10">
          Trusted by forward-thinking businesses
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((name) => (
            <div
              key={name}
              className="h-8 flex items-center justify-center text-text-muted/40 font-display font-bold text-lg tracking-tight select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const items = [
  {
    quote: "Prime Link delivered, configured and trained our staff on 12 ETR machines across our branches in one week. Smooth and professional.",
    name: "Wanjiru Kamau",
    role: "Operations Lead, Retail Chain",
  },
  {
    quote: "Their POS and inventory system finally gave us a single source of truth. Stock variances dropped by 80% in three months.",
    name: "Daniel Otieno",
    role: "Owner, Hospitality Group",
  },
  {
    quote: "The laptops we sourced for our team were perfectly spec'd and on-budget. Support has been responsive whenever we need it.",
    name: "Aisha Mohamed",
    role: "IT Manager, Consulting Firm",
  },
];

export const Testimonials = () => (
  <section className="py-20 lg:py-28 border-t border-border/60">
    <div className="container-px">
      <div className="max-w-2xl">
        <span className="eyebrow">Trusted by teams</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">What our clients say</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
            <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
            <figcaption className="mt-auto pt-4 border-t border-border">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

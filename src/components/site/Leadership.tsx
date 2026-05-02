const team = [
  {
    name: "Peter Njuguna",
    role: "Co-founder & CEO",
    bio: "Leads strategy, partnerships and customer success across Prime Link Technologies.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dennis Nyagah",
    role: "Co-founder & CTO",
    bio: "Heads engineering, product and the technical infrastructure powering our solutions.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  },
];

export const Leadership = () => (
  <section className="py-20 lg:py-28 border-t border-border/60 bg-surface/60">
    <div className="container-px">
      <div className="max-w-2xl">
        <span className="eyebrow">Leadership</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Meet the team behind Prime Link</h2>
        <p className="mt-3 text-muted-foreground">
          A small, focused team building reliable technology for businesses and individuals.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2 max-w-5xl">
        {team.map((m) => (
          <article key={m.name} className="card-hover rounded-xl border border-border bg-card overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="shrink-0 bg-muted/50 sm:w-48 h-48 sm:h-auto">
              <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-sm font-medium tracking-wide text-accent mt-1">{m.role}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const team = [
  {
    name: "Peter Njuguna",
    role: "Co-founder & CEO",
    bio: "Leads strategy, partnerships and customer success across Prime Link Technologies.",
    initials: "PN",
  },
  {
    name: "Dennis Nyagah",
    role: "Chief Technology Officer",
    bio: "Heads engineering, product and the technical infrastructure powering our solutions.",
    initials: "DN",
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
      <div className="mt-12 grid gap-5 sm:grid-cols-2 max-w-3xl">
        {team.map((m) => (
          <article key={m.name} className="card-hover rounded-xl border border-border bg-card p-6 flex items-start gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full accent-gradient text-accent-foreground font-semibold text-sm">
              {m.initials}
            </div>
            <div>
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-xs uppercase tracking-wider text-accent mt-1">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

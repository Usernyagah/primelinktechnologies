import { Check, ArrowRight } from "lucide-react";
import softwareImg from "@/assets/cat-software.jpg";

const points = [
  "KRA-compliant ETR machines with on-site setup and training",
  "POS, accounting and inventory software tailored to your workflow",
  "Multi-branch support, real-time reporting and offline resilience",
  "Local technical support with same-day response in major towns",
];

export const Business = () => (
  <section id="business" className="py-20 lg:py-28 border-t border-border/60 bg-surface/60">
    <div className="container-px grid lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <span className="eyebrow">Business solutions</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Run a tighter business with the right tools.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl">
          We supply, install and support fiscal devices and business software for retail, hospitality, services and SMEs. One partner for hardware, software and ongoing maintenance.
        </p>
        <ul className="mt-8 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-md accent-gradient px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all">
            Request a quote <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#shop" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-accent transition-all">
            View ETR machines
          </a>
        </div>
      </div>
      <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden border border-border">
        <img src={softwareImg} alt="Business software dashboard" loading="lazy" width={800} height={800} className="w-full h-full object-cover" />
        <div className="absolute inset-0 ring-1 ring-inset ring-accent/10 rounded-2xl" />
      </div>
    </div>
  </section>
);

import heroImg from "@/assets/hero-devices.jpg";
import { ArrowRight } from "lucide-react";

export const Hero = () => (
  <section id="home" className="relative overflow-hidden hero-bg">
    <div className="container-px grid lg:grid-cols-12 gap-10 py-20 lg:py-28 items-center">
      <div className="lg:col-span-6 animate-fade-up">
        <span className="eyebrow"><span className="h-1 w-1 rounded-full bg-accent" /> Reliable Tech Solutions</span>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
          Power your business with <span className="text-accent">trusted technology</span>.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
          Smartphones, laptops, ETR machines and business software — sourced, configured and supported by Prime Link Technologies. Built for productivity. Backed by warranty.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 rounded-md accent-gradient px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all"
          >
            Shop products <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#business"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-3 text-sm font-semibold text-foreground hover:border-accent hover:bg-secondary transition-all"
          >
            Business solutions
          </a>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-6">
          <div>
            <dt className="text-2xl font-bold">5K+</dt>
            <dd className="text-xs text-muted-foreground mt-1">Devices delivered</dd>
          </div>
          <div>
            <dt className="text-2xl font-bold">24 mo</dt>
            <dd className="text-xs text-muted-foreground mt-1">Warranty cover</dd>
          </div>
          <div>
            <dt className="text-2xl font-bold">98%</dt>
            <dd className="text-xs text-muted-foreground mt-1">Client retention</dd>
          </div>
        </dl>
      </div>
      <div className="lg:col-span-6 relative">
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.7)]">
          <img
            src={heroImg}
            alt="Smartphone, tablet and laptop — Prime Link Technologies product range"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-accent/10 rounded-2xl pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
);

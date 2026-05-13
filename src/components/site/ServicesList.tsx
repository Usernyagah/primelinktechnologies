import { 
  GraduationCap, 
  Building, 
  Network, 
  Store, 
  ShoppingBag, 
  Code, 
  LineChart, 
  Palette,
  BarChart3,
  Search,
  Settings,
  Database,
  Smartphone,
  Cpu,
  Globe
} from "lucide-react";
import { services } from "@/data/services";

const ICON_MAP: Record<string, any> = {
  GraduationCap, 
  Building, 
  Network, 
  Store, 
  ShoppingBag, 
  Code, 
  LineChart, 
  Palette,
  BarChart3,
  Search,
  Settings,
  Database,
  Smartphone,
  Cpu,
  Globe
};

export const ServicesList = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/20">
      <div className="container-px">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow">Our Expertise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Software & Services</h2>
          <p className="mt-4 text-muted-foreground">
            We deliver cutting-edge digital solutions tailored to help your business scale, operate efficiently, and dominate the modern market.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => {
            const Icon = ICON_MAP[s.icon] || Globe;
            return (
              <div 
                key={s.id} 
                className="group overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm hover:border-accent/50 transition-all flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 h-10 w-10 rounded-xl bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col items-start">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {s.description}
                  </p>
                  <a 
                    href={`https://wa.me/254703617164?text=${encodeURIComponent(`Hi, I'm interested in a demo for ${s.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-all w-full"
                  >
                    Request a Demo
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

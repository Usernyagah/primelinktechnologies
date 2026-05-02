import { 
  GraduationCap, 
  Building, 
  Network, 
  Store, 
  ShoppingBag, 
  Code, 
  LineChart, 
  Palette,
  BarChart3
} from "lucide-react";
import serviceSchool from "@/assets/service_school.png";
import serviceOffice from "@/assets/service_office.png";
import serviceErp from "@/assets/service_erp.png";
import servicePos from "@/assets/service_pos.png";

const services = [
  {
    title: "School Management Systems",
    description: "Comprehensive platforms to manage students, staff, academics, and administration in educational institutions.",
    icon: GraduationCap,
    image: serviceSchool,
  },
  {
    title: "Office Automation",
    description: "Streamline your business processes, enhance productivity, and reduce manual workloads with automated workflows.",
    icon: Building,
    image: serviceOffice,
  },
  {
    title: "Custom ERP",
    description: "Tailor-made Enterprise Resource Planning software designed specifically to fit your unique business requirements.",
    icon: Network,
    image: serviceErp,
  },
  {
    title: "Point of Sale Systems",
    description: "Fast, reliable, and user-friendly POS solutions for retail, hospitality, and service-based businesses.",
    icon: Store,
    image: servicePos,
  },
  {
    title: "E-commerce Platforms",
    description: "Robust online stores with secure payment gateways, inventory management, and seamless customer experiences.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Web Development",
    description: "Modern, responsive, and high-performance websites built with the latest technologies to elevate your brand.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "SEO Services",
    description: "Data-driven Search Engine Optimization to increase visibility, drive organic traffic, and boost conversions.",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Graphic Design",
    description: "Creative visual solutions including logos, branding, marketing materials, and stunning user interfaces.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Advanced Analytics Dashboards",
    description: "Transform your raw data into actionable insights with interactive, real-time analytics and custom reporting dashboards.",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  },
];

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
          {services.map((s) => (
            <div 
              key={s.title} 
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
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col items-start">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "School Management Systems",
    description: "Comprehensive digital solutions for educational institutions to manage students, staff, and curriculum seamlessly.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    icon: "GraduationCap"
  },
  {
    id: "2",
    title: "Enterprise Resource Planning (ERP)",
    description: "Integrated business management software to automate and streamline core business processes in real-time.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    icon: "Building"
  },
  {
    id: "3",
    title: "Advanced Data Analytics",
    description: "Transform your raw data into actionable insights with our sophisticated analytics and visualization tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    icon: "BarChart3"
  },
  {
    id: "4",
    title: "Custom Software Development",
    description: "Tailor-made software solutions designed to solve your unique business challenges and drive growth.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    icon: "Code"
  },
  {
    id: "5",
    title: "Networking & Infrastructure",
    description: "Robust and secure network architecture design and implementation for modern digital enterprises.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=800&auto=format&fit=crop",
    icon: "Network"
  },
  {
    id: "6",
    title: "Mobile App Development",
    description: "High-performance iOS and Android applications that provide exceptional user experiences on the go.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    icon: "Smartphone"
  },
  {
    id: "7",
    title: "E-commerce Solutions",
    description: "Scalable and secure online storefronts equipped with advanced payment gateways and inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    icon: "ShoppingBag"
  },
  {
    id: "8",
    title: "Cloud Computing Services",
    description: "Secure and reliable cloud migration and management services to enhance your business's agility and scalability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    icon: "Globe"
  }
];

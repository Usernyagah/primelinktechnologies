import { FOOTER_LINKS } from "@/data/footer-links";
import { Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const cols = FOOTER_LINKS;

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com/PrimeLinkTechnologies",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/primelinktechnologies",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@primelinktechnologies",
    icon: FaTiktok,
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@primelinktechnologies",
    icon: BsThreads,
  },
];

export const Footer = () => (
  <footer id="about" className="border-t border-border/60 bg-surface">
    <div className="container-px py-16">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md accent-gradient text-accent-foreground font-bold">P</span>
            <span className="font-semibold">Prime Link Technologies</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Reliable tech solutions for business and personal use — devices, fiscal hardware and business software, supplied and supported across the region.
          </p>
          <div className="mt-6 text-sm text-muted-foreground space-y-1">
            <p>Primelinktechnologies6@gmail.com</p>
            <p>+254 703 617 164</p>
            <p>+254 742 628 137</p>
            <p>Nairobi, Kenya</p>
          </div>
          <div className="mt-6 flex gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l, index) => (
                  <li key={`${c.title}-${index}`}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Prime Link Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

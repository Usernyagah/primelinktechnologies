import { Link } from "react-router-dom";

const cols = [
  { title: "Shop", links: ["Phones", "Laptops & Desktops", "Tablets", "ETR Machines", "Business Software"] },
  { title: "Business", links: ["POS Systems", "Accounting", "Inventory", "ETR Compliance", "Bulk orders"] },
  { title: "Company", links: ["About us", "Careers", "Press", "Partners", "Contact"] },
  { title: "Support", links: ["Warranty", "Returns", "Repairs", "Setup & training", "FAQ"] },
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
            <p>sales@primelinktech.co</p>
            <p>+254 703 617 164</p>
            <p>+254 742 628 137</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
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
          <Link to="/admin/login" className="hover:text-foreground transition-colors">Admin Portal</Link>
        </div>
      </div>
    </div>
  </footer>
);

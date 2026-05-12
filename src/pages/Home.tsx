import { useOutletContext } from "react-router-dom";
import { Hero } from "@/components/site/Hero";
import { Deals } from "@/components/site/Deals";
import { Testimonials } from "@/components/site/Testimonials";
import { Categories } from "@/components/site/Categories";
import { Shop } from "@/components/site/Shop";
import { ServicesList } from "@/components/site/ServicesList";
import { Business } from "@/components/site/Business";
import { Leadership } from "@/components/site/Leadership";
import { Contact } from "@/components/site/Contact";

export const Home = () => {
  const { query } = useOutletContext<{ query: string }>();

  return (
    <>
      {/* Home */}
      <section id="home">
        <Hero />
        <Deals />
      </section>

      {/* Products */}
      <section id="products">
        <Categories />
        <Shop query={query} />
      </section>

      {/* Services */}
      <section id="services">
        <ServicesList />
        <Business />
      </section>

      {/* About */}
      <section id="about">
        <div className="py-20 bg-background">
          <div className="container-px">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow">About Us</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Driving Innovation with Technology</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                At Prime Link Technologies, we are passionate about delivering top-tier digital
                solutions and state-of-the-art hardware to empower businesses and individuals.
                Our mission is to bridge the gap between complex technological challenges and
                efficient, elegant solutions.
              </p>
            </div>
          </div>
        </div>
        <Leadership />
      </section>

      {/* Testimonials — just above the footer */}
      <Testimonials />

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;

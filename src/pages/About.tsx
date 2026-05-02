import { Leadership } from "@/components/site/Leadership";

export const About = () => {
  return (
    <>
      <section className="py-20 bg-background">
        <div className="container-px">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">About Us</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Driving Innovation with Technology</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Prime Link Technologies, we are passionate about delivering top-tier digital 
              solutions and state-of-the-art hardware to empower businesses and individuals. 
              Our mission is to bridge the gap between complex technological challenges and 
              efficient, elegant solutions.
            </p>
          </div>
        </div>
      </section>
      <Leadership />
    </>
  );
};

export default About;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveAudit from "@/components/InteractiveAudit";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <InteractiveAudit />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Cases />
        <div className="section-divider" />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

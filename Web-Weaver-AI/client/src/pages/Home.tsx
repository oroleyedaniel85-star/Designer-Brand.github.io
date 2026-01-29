import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold tracking-tighter mb-4 italic">DESIGNBRAND</p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} DesignBrand Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

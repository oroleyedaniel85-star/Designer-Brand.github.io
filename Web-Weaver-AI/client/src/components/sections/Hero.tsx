import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          We Design <span className="text-primary italic">Digital Excellence</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
          A premium design brand crafting visually impressive identities, interfaces, and creative solutions for forward-thinking brands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="rounded-full px-8 hover-elevate active-elevate-2 transition-all duration-300"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Portfolio
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 text-white border-white hover:bg-white hover:text-black hover-elevate active-elevate-2 transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request a Quote
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { api } from "@shared/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Layout, Briefcase, Share2, MousePointer2 } from "lucide-react";

import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Palette,
  Layout,
  Briefcase,
  Share2,
};

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: [api.services.list.path],
  });

  if (isLoading) return null;

  return (
    <section className="py-24 bg-background" id="services">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive design solutions tailored to elevate your brand presence across all platforms.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service, index) => {
            const Icon = iconMap[service.icon] || MousePointer2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover-elevate border-none shadow-none bg-muted/50 h-full transition-all duration-300 hover:bg-muted/80">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

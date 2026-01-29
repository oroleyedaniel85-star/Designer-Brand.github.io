import { useQuery } from "@tanstack/react-query";
import { PortfolioItem } from "@shared/schema";
import { api } from "@shared/routes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const { data: items, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: [api.portfolio.list.path],
  });

  if (isLoading) return null;

  // Fix: Convert Set to Array properly for TS/ES environments
  const categories = ["all", ...items ? Array.from(new Set(items.map((item) => item.category))) : []];
  const filteredItems = filter === "all" ? items : items?.filter((item) => item.category === filter);

  return (
    <section className="py-24 bg-muted/30" id="portfolio">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Recent Works</h2>
            <p className="text-muted-foreground">A curated collection of our latest creative endeavors.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full capitalize transition-all duration-300",
                  filter === cat ? "shadow-md" : "hover:bg-background"
                )}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems?.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl bg-card border shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" className="rounded-full pointer-events-none scale-90 group-hover:scale-100 transition-transform duration-300">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                      {item.category}
                    </p>
                    {item.client && (
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {item.client}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-1 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 gap-0">
          {selectedItem && (
            <>
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <DialogHeader className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded">
                      {selectedItem.category}
                    </span>
                    {selectedItem.client && (
                      <span className="text-xs text-muted-foreground">
                        Client: <span className="font-semibold">{selectedItem.client}</span>
                      </span>
                    )}
                  </div>
                  <DialogTitle className="text-3xl font-bold">{selectedItem.title}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {selectedItem.description}
                </DialogDescription>
                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setSelectedItem(null)} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

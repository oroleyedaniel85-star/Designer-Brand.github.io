import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { api } from "@shared/routes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: [api.testimonials.list.path],
  });

  if (isLoading) return null;

  return (
    <section className="py-24 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Love</h2>
          <p className="text-muted-foreground">Hear from the brands we've helped elevate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials?.map((t) => (
            <Card key={t.id} className="relative border-none bg-muted/50">
              <CardContent className="pt-12 pb-8 px-8">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
                <p className="text-lg mb-8 italic text-foreground/80">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={t.avatarUrl || ""} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

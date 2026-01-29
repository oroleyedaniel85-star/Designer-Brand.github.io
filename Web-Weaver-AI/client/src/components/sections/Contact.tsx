import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteRequestSchema, type InsertQuoteRequest, type PortfolioItem } from "@shared/schema";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Loader2, Check } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { toast } = useToast();
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  
  const { data: portfolioItems } = useQuery<PortfolioItem[]>({
    queryKey: [api.portfolio.list.path],
  });

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
      selectedDesigns: "",
    },
  });

  useEffect(() => {
    form.setValue("selectedDesigns", selectedDesigns.join(", "));
  }, [selectedDesigns, form]);

  const toggleDesign = (title: string) => {
    setSelectedDesigns(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  async function onSubmit(data: InsertQuoteRequest) {
    try {
      await apiRequest("POST", api.quotes.create.path, data);
      toast({
        title: "Success!",
        description: "Your quote request has been sent. We'll be in touch soon.",
      });
      form.reset();
      setSelectedDesigns([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <section className="py-24 bg-muted/30" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Ready to elevate your brand? Reach out through any of these channels or fill out the form.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Our Portfolio Collection</h3>
                <p className="text-sm text-muted-foreground">Select designs you're interested in to include them in your quote request.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {portfolioItems?.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleDesign(item.title)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                        selectedDesigns.includes(item.title) ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                      )}
                    >
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className={cn(
                        "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
                        selectedDesigns.includes(item.title) ? "opacity-100" : "opacity-0"
                      )}>
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                        <p className="text-[10px] text-white truncate text-center font-medium">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <a 
                href="mailto:oroleyedaniel85@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border hover-elevate active-elevate-2 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email Us</p>
                  <p className="font-semibold">oroleyedaniel85@gmail.com</p>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:09012077040"
                  className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-card border hover-elevate active-elevate-2 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Call Us</p>
                    <p className="font-semibold">09012077040</p>
                  </div>
                </a>
                <a 
                  href="tel:08083608464"
                  className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-card border hover-elevate active-elevate-2 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">WhatsApp</p>
                    <p className="font-semibold">08083608464</p>
                  </div>
                </a>
              </div>

              <a 
                href="https://www.tiktok.com/@zeyor00"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border hover-elevate active-elevate-2 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <SiTiktok className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">TikTok</p>
                  <p className="font-semibold">@zeyor00</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="uiux">UI/UX Design</SelectItem>
                          <SelectItem value="graphic">Graphic Design</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="custom">Custom Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="selectedDesigns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selected Designs</FormLabel>
                      <FormControl>
                        <Input readOnly placeholder="Select designs from the left..." {...field} value={field.value || ""} className="bg-muted" />
                      </FormControl>
                      <FormDescription>Designs you've selected from our collection.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg hover-elevate active-elevate-2" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Request"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}




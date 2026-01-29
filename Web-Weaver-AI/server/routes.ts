import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendQuoteEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.services.list.path, async (_req, res) => {
    const items = await storage.getServices();
    res.json(items);
  });

  app.get(api.portfolio.list.path, async (_req, res) => {
    const items = await storage.getPortfolio();
    res.json(items);
  });

  app.get(api.testimonials.list.path, async (_req, res) => {
    const items = await storage.getTestimonials();
    res.json(items);
  });

  app.post(api.quotes.create.path, async (req, res) => {
    try {
      const input = api.quotes.create.input.parse(req.body);
      
      // Send email notification
      try {
        await sendQuoteEmail(input);
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr);
        // We still save to DB even if email fails
      }

      const request = await storage.createQuoteRequest(input);
      res.status(201).json({ message: "Quote request submitted successfully", id: request.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed data if empty
  await seedData();

  return httpServer;
}

async function seedData() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    const { db } = await import("./db");
    const { services, portfolio, testimonials } = await import("@shared/schema");
    
    await db.insert(services).values([
      { name: "Graphic Design", description: "Creative visual solutions for your brand identity.", icon: "Palette", category: "graphic" },
      { name: "UI/UX Design", description: "Intuitive digital experiences designed for users.", icon: "Layout", category: "uiux" },
      { name: "Branding", description: "Strategic brand development and visual storytelling.", icon: "Briefcase", category: "branding" },
      { name: "Social Media", description: "Engaging content designed for maximum social impact.", icon: "Share2", category: "social" },
    ]);

    await db.insert(portfolio).values([
      { title: "EcoBrand Identity", description: "Sustainable packaging and logo design.", imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c", category: "branding", client: "EcoLife" },
      { title: "Fintech App UI", description: "Modern banking experience with clean interface.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", category: "uiux", client: "WealthFlow" },
      { title: "Minimalist Posters", description: "A series of geometric art prints.", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c", category: "graphic", client: "ArtHaus" },
    ]);

    await db.insert(testimonials).values([
      { name: "Sarah Johnson", role: "CEO, TechFlow", content: "The design work exceeded our expectations. Truly a premium experience.", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
      { name: "Michael Chen", role: "Founder, GreenSpace", content: "Exceptional attention to detail and creative vision. Highly recommended.", avatarUrl: "https://i.pravatar.cc/150?u=michael" },
    ]);
  }
}

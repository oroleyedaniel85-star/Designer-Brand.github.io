import {
  services,
  portfolio,
  testimonials,
  quoteRequests,
  type Service,
  type PortfolioItem,
  type Testimonial,
  type QuoteRequest,
  type InsertQuoteRequest,
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getPortfolio(): Promise<PortfolioItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
}

// If DATABASE_URL is present we use the real database-backed storage.
// Otherwise fall back to an in-memory storage so the server can start
// without a database (useful for static sites and local testing).
let storageImpl: IStorage;

if (process.env.DATABASE_URL) {
  // lazy require to avoid bundling DB client when not needed
  const { db } = require("./db");

  class DatabaseStorage implements IStorage {
    async getServices(): Promise<Service[]> {
      return await db.select().from(services);
    }

    async getPortfolio(): Promise<PortfolioItem[]> {
      return await db.select().from(portfolio);
    }

    async getTestimonials(): Promise<Testimonial[]> {
      return await db.select().from(testimonials);
    }

    async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
      const [request] = await db
        .insert(quoteRequests)
        .values(insertRequest)
        .returning();
      return request;
    }
  }

  storageImpl = new DatabaseStorage();
} else {
  // In-memory fallback storage
  class InMemoryStorage implements IStorage {
    private _services: Service[] = [];
    private _portfolio: PortfolioItem[] = [];
    private _testimonials: Testimonial[] = [];
    private _quotes: QuoteRequest[] = [];

    async getServices(): Promise<Service[]> {
      return this._services;
    }

    async getPortfolio(): Promise<PortfolioItem[]> {
      return this._portfolio;
    }

    async getTestimonials(): Promise<Testimonial[]> {
      return this._testimonials;
    }

    async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
      const id = (this._quotes.length + 1).toString();
      const now = new Date();
      const request: any = { id, createdAt: now.toISOString(), ...insertRequest };
      this._quotes.push(request as QuoteRequest);
      return request as QuoteRequest;
    }
  }

  const mem = new InMemoryStorage();
  mem.getServices = async () => [
    { id: "1", name: "Graphic Design", description: "Creative visual solutions for your brand identity.", icon: "Palette", category: "graphic" },
    { id: "2", name: "UI/UX Design", description: "Intuitive digital experiences designed for users.", icon: "Layout", category: "uiux" },
    { id: "3", name: "Branding", description: "Strategic brand development and visual storytelling.", icon: "Briefcase", category: "branding" },
  ];
  mem.getPortfolio = async () => [
    { id: "1", title: "EcoBrand Identity", description: "Sustainable packaging and logo design.", imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c", category: "branding", client: "EcoLife" },
    { id: "2", title: "Fintech App UI", description: "Modern banking experience with clean interface.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", category: "uiux", client: "WealthFlow" },
  ];
  mem.getTestimonials = async () => [
    { id: "1", name: "Sarah Johnson", role: "CEO, TechFlow", content: "The design work exceeded our expectations. Truly a premium experience.", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
    { id: "2", name: "Michael Chen", role: "Founder, GreenSpace", content: "Exceptional attention to detail and creative vision. Highly recommended.", avatarUrl: "https://i.pravatar.cc/150?u=michael" },
  ];

  storageImpl = mem;
}

export const storage = storageImpl;


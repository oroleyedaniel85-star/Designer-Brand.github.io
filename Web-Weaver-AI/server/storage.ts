import { db } from "./db";
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
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getPortfolio(): Promise<PortfolioItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
}

export class DatabaseStorage implements IStorage {
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

export const storage = new DatabaseStorage();

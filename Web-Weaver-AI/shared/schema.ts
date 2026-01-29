import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // graphic, uiux, branding, social, custom
});

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  client: text("client"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  avatarUrl: text("avatar_url"),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  selectedDesigns: text("selected_designs"), // comma separated list or JSON string
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertPortfolioSchema = createInsertSchema(portfolio).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({ id: true, status: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type PortfolioItem = typeof portfolio.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;

export type CreateQuoteRequest = InsertQuoteRequest;
export type QuoteRequestResponse = QuoteRequest;

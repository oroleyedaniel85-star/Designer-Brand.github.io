# DesignBrand Studio

## Overview

A portfolio and quote request website for a design brand studio. The application showcases services, portfolio items, and client testimonials while allowing potential clients to submit quote requests. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express 5 running on Node.js
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Storage Pattern**: Repository pattern via `storage.ts` abstracting database operations

### Shared Layer
- **Schema Definitions**: `shared/schema.ts` contains Drizzle table definitions and Zod validation schemas
- **Route Contracts**: `shared/routes.ts` defines API endpoints with input/output schemas
- **Type Safety**: Full end-to-end type safety from database to frontend

### Data Models
- **Services**: Design service offerings with name, description, icon, and category
- **Portfolio**: Project showcase items with title, description, image, category, and client
- **Testimonials**: Client reviews with name, role, content, and avatar
- **Quote Requests**: Contact form submissions with name, email, project type, message, and status

### Development vs Production
- Development uses Vite dev server with HMR proxied through Express
- Production serves pre-built static files from `dist/public`
- Build process bundles both frontend (Vite) and backend (esbuild) into `dist/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `/migrations` directory
- **connect-pg-simple**: Session storage (available but not currently in active use)

### UI Libraries
- **Radix UI**: Headless component primitives (dialog, popover, select, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **React Day Picker**: Date picker component
- **Vaul**: Drawer component

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. Database features will be disabled — running in fallback mode.",
  );
  // Export placeholders so imports don't throw; callers should guard behavior
  export const pool = undefined as unknown as typeof Pool;
  export const db = undefined as unknown;
} else {
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle(pool, { schema });
}

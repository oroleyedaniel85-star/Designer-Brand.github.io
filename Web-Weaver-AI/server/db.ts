import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : undefined as unknown as Pool | undefined;

export const db = process.env.DATABASE_URL
  ? drizzle(pool as Pool, { schema })
  : undefined as unknown;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. Database features will be disabled — running in fallback mode.",
  );
}

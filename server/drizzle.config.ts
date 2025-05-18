import type { Config } from "drizzle-kit";
import { config } from "dotenv";
config();

export default {
  schema: "./db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
  },
  driver: "pg",
} satisfies Config;

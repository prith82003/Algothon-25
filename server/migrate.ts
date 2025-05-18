import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { config } from "dotenv";
config();

const client = new Client({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
});

client.connect().then(() => {
  const db = drizzle(client);
  migrate(db, { migrationsFolder: "drizzle" }).then(() => client.end());
});

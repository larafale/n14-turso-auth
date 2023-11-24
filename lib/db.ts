import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/lib/schema";
import { createId } from "@paralleldrive/cuid2";

const client = createClient({
  url: process.env.TURSO_DB_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

export const db = drizzle(client, { schema });
export const tables = schema;
export const ID = createId;

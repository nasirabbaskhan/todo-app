import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task").notNull(),
});

export type todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable>;

export const db = drizzle(sql);

import { date, integer, jsonb, numeric, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const databases = pgTable("databases", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id").notNull(),
    visibility: text("visibility").notNull(),
    provider: text("provider").notNull(),
    keys: jsonb("keys").$type<Record<string, string>>().notNull(),
    limit: numeric("limit", { mode: 'number' }).notNull(),
    alerts: jsonb("alerts").$type<any[]>().notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull().default("No description provided."),
    ownerId: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    databaseId: text("database_id").notNull().references(() => databases.id, { onDelete: "cascade" }),
    limit: numeric("limit", { mode: 'number' }).notNull(),
    status: text("status").notNull(),
    alerts: jsonb("alerts").$type<any[]>().notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
})

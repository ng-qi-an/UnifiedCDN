import { date, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const databases = pgTable("databases", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id").notNull(),
    visibility: text("visibility").notNull(),
    service: text("service").notNull(),
    key: text("key").notNull(),
    limit: integer("limit").notNull(),
    alerts: jsonb("alerts").$type<any[]>().notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    databaseId: text("database_id").notNull().references(() => databases.id, { onDelete: "cascade" }),
    limit: integer("limit").notNull(),
    alerts: jsonb("alerts").$type<any[]>().notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
})
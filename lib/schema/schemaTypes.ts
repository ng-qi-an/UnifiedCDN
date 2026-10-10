import { auth } from "../auth";
import { applications, databases } from "./schema";

export type User = typeof auth.$Infer.Session.user;

export type Database = typeof databases.$inferSelect;
export type Application = typeof applications.$inferSelect;
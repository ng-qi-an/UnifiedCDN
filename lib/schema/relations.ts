import { defineRelationsPart } from "drizzle-orm";
import { applications } from "./schema";
import { user } from "./auth-schema";

export const relations = defineRelationsPart({ applications, user }, (r) => ({
    applications: {
        owner: r.one.user({
            from: r.applications.ownerId,
            to: r.user.id,
        })
    },
    user: {
        applications: r.many.applications()
    }
}))
import { defineRelationsPart } from "drizzle-orm";
import { applications, databases, files } from "./schema";
import { user } from "./auth-schema";

export const relations = defineRelationsPart({ applications, user, files, databases }, (r) => ({
    databases: {
        owner: r.one.user({
            from: r.databases.ownerId,
            to: r.user.id,
        }),
        applications: r.many.applications(),
        files: r.many.files()
    },
    applications: {
        owner: r.one.user({
            from: r.applications.ownerId,
            to: r.user.id,
        }),
        database: r.one.databases({
            from: r.applications.databaseId,
            to: r.databases.id
        }),
        files: r.many.files()
    },
    user: {
        applications: r.many.applications()
    },
    files: {
        database: r.one.databases({
            from: r.files.databaseId,
            to: r.databases.id
        }),
        applications: r.one.applications({
            from: r.files.applicationId,
            to: r.applications.id
        })
    }
}))
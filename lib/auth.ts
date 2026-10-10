import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "./db";
import { admin } from "better-auth/plugins"
import * as schema from "./schema/auth-schema";
import { ac, adminRole, superAdminRole, userRole, viewOnlyRole } from "./permissions";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: { 
        enabled: true, 
        revokeSessionsOnPasswordReset: true, 
    }, 
    user: {
        additionalFields: {

        }
    },
    plugins: [
        admin({
            ac,
            roles: {
                superAdmin: superAdminRole,
                admin: adminRole,
                user: userRole,
                viewOnly: viewOnlyRole
            }
        })
    ]
});

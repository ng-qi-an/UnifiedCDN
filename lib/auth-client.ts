import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { ac, adminRole, superAdminRole, userRole, viewOnlyRole } from "./permissions";
import { apiKeyClient } from "@better-auth/api-key/client";
export const authClient = createAuthClient({
    plugins: [
        adminClient({
            ac,
            roles: {
                superAdmin: superAdminRole,
                admin: adminRole,
                user: userRole,
                viewOnly: viewOnlyRole
            }
        }),
        apiKeyClient()
    ]
})
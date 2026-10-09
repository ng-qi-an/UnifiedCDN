import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, userAc } from "better-auth/plugins/admin/access";

const statement = { 
    ...defaultStatements,
    applications: ["create", "update", "delete", "viewAll"], 
} as const; 

export const ac = createAccessControl(statement); 

export const viewOnlyRole = ac.newRole({
    ...userAc.statements
})

export const userRole = ac.newRole({
    ...userAc.statements,
    applications: ["create", "update", "delete"]
})

export const adminRole = ac.newRole({
    ...adminAc.statements,
    applications: [...userRole.statements.applications, "viewAll"]
})

export const superAdminRole = ac.newRole({
    ...adminAc.statements,
    user: [...adminAc.statements.user, "impersonate-admins"],
    applications: [...adminRole.statements.applications]
})
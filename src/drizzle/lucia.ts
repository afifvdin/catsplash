import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"
import { SelectUsers, sessionsTable, usersTable } from "./schema"
import { db } from "./db"

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable)

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    }
  },
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: SelectUsers
  }
}

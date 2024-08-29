import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { generateId } from "lucia"

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId(15)),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
})

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export type InsertUsers = typeof usersTable.$inferInsert
export type SelectUsers = typeof usersTable.$inferSelect

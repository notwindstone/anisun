import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const auth = pgTable("auth", {
    id: integer("id").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});

export const comments = pgTable("comments", {
    id: integer("id").primaryKey(),
    avatar: text("avatar").notNull(),
    username: text("username").notNull(),
    message: text("message").notNull(),
})
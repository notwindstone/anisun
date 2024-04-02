import {integer, text, pgTable, uuid} from "drizzle-orm/pg-core";

export const auth = pgTable("auth", {
    id: integer("id").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});

export const comments = pgTable("comments", {
    uuid: uuid("uuid").primaryKey(),
    avatar: text("avatar").notNull(),
    username: text("username").notNull(),
    date: text("date").notNull(),
    likes: integer("likes").default(0),
    dislikes: integer("dislikes").default(0),
    message: text("message").notNull(),
})
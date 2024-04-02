import {integer, text, pgTable} from "drizzle-orm/pg-core";

export const auth = pgTable("auth", {
    uuid: text("uuid").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});

export const comments = pgTable("comments", {
    uuid: text("uuid").primaryKey(),
    title: text("title").notNull(),
    avatar: text("avatar").notNull(),
    username: text("username").notNull(),
    date: text("date").notNull(),
    likes: integer("likes").default(0),
    dislikes: integer("dislikes").default(0),
    message: text("message").notNull(),
})
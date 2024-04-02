import {integer, text, pgTable, boolean} from "drizzle-orm/pg-core";

export const auth = pgTable("auth", {
    uuid: text("uuid").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});

export const comments = pgTable("comments", {
    uuid: text("uuid").primaryKey(),
    // Title в данном случае является названием аниме,
    // на странице которого будут показываться комментарии.
    title: text("title").notNull(),
    userid: text("userid").notNull(),
    username: text("username").notNull(),
    avatar: text("avatar").notNull(),
    date: text("date").notNull(),
    likes: integer("likes").default(0),
    dislikes: integer("dislikes").default(0),
    message: text("message").notNull(),
    isDeleted: boolean("isDeleted").default(false),
    isEdited: boolean("isEdited").default(false),
})
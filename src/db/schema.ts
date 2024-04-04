import {text, pgTable, boolean} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    userid: text("userid").primaryKey(),
    username: text("username"),
    email: text("email").notNull(),
    avatar: text("avatar").notNull(),
    createdAt: text("createdAt").notNull(),
    isVerified: boolean("isVerified").default(false).notNull(),
});

export const comments = pgTable("comments", {
    uuid: text("uuid").primaryKey(),
    // Title в данном случае является названием аниме,
    // на странице которого будут показываться комментарии.
    title: text("title").notNull(),
    userid: text("userid").notNull(),
    username: text("username").notNull(),
    avatar: text("avatar").notNull(),
    createdAt: text('createdAt').notNull(),
    likes: text("likes").default([]).notNull().array(),
    dislikes: text("dislikes").default([]).notNull().array(),
    message: text("message").notNull(),
    isDeleted: boolean("isDeleted").default(false).notNull(),
    isEdited: boolean("isEdited").default(false).notNull(),
})
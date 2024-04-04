import {text, json, pgTable, boolean} from "drizzle-orm/pg-core";

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
    parent: text("parentuuid"),
    // Title в данном случае является названием аниме,
    // на странице которого будут показываться комментарии.
    title: text("title").notNull(),
    userid: text("userid").notNull(),
    username: text("username").notNull(),
    avatar: text("avatar").notNull(),
    createdAt: text('createdAt').notNull(),
    likes: json("likes").default([]).notNull().array(),
    dislikes: json("dislikes").default([]).notNull().array(),
    message: text("message").notNull(),
    isDeleted: boolean("isDeleted").default(false).notNull(),
    isEdited: boolean("isEdited").default(false).notNull(),
})
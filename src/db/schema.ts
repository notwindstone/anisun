import {text, json, pgTable, boolean} from "drizzle-orm/pg-core";
//import {sqliteTable, text as sqliteText, integer as sqliteInteger} from "drizzle-orm/sqlite-core";

const getCommentsTableSchema = () => {
    switch (process.env.DATABASE_TYPE!) {
        case "postgresql":
        case "neon":
            return pgTable("comments", {
                uuid: text("uuid").primaryKey(),
                parentuuid: text("parentuuid"),
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
            });
            /*
        case "sqlite":
            return sqliteTable("comments", {
                uuid: sqliteText("uuid").primaryKey(),
                parentuuid: sqliteText("parentuuid"),
                // Title в данном случае является названием аниме,
                // на странице которого будут показываться комментарии.
                title: sqliteText("title").notNull(),
                userid: sqliteText("userid").notNull(),
                username: sqliteText("username").notNull(),
                avatar: sqliteText("avatar").notNull(),
                createdAt: sqliteText('createdAt').notNull(),
                likes: sqliteText("likes").default(JSON.stringify([])).notNull(),
                dislikes: sqliteText("dislikes").default(JSON.stringify([])).notNull(),
                message: sqliteText("message").notNull(),
                isDeleted: sqliteInteger("isDeleted").default(0).notNull(),
                isEdited: sqliteInteger("isEdited").default(0).notNull(),
            });
            */
        default:
            throw new Error("blah blah");
    }
};

export const parseCommentsTableSchema = () => {

};

export const comments = getCommentsTableSchema();
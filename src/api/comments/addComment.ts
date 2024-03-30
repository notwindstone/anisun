import db from "@/db/drizzle";
import { comments } from "@/db/schema";

export const addComment = async (id: number, avatar: string, username: string, message: string) => {
    await db.insert(comments).values({
        id: id,
        avatar: avatar,
        username: username,
        message: message,
    });
};
import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const editTodo = async (id: number, message: string) => {
    await db
        .update(comments)
        .set({
            message: message,
        })
        .where(eq(comments.id, id));
};
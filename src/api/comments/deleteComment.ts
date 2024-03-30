import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const deleteTodo = async (id: number) => {
    await db.delete(comments).where(eq(comments.id, id));
};
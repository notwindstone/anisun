import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { asc } from 'drizzle-orm';

export const getComments = async () => {
    const data = await db.select().from(comments).orderBy(asc(comments));

    return data;
};
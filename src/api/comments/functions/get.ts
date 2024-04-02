"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { desc, eq } from 'drizzle-orm';

export const get = async (title: string, limit: number = 8, offset: number = 0) => {
    const data =
        await db
            .select()
            .from(comments)
            .where(eq(comments.title, title))
            .orderBy(desc(comments.date))
            .limit(limit)
            .offset(offset);
    return data;
};
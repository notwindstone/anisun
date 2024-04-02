"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { desc, eq } from 'drizzle-orm';

export const get = async (title: string) => {
    const data =
        await db
            .select()
            .from(comments)
            .where(eq(comments.title, title))
            .orderBy(desc(comments.date));
    return data;
};
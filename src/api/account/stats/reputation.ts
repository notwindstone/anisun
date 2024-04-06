"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const reputation = async ({ userid }: { userid: string }) => {
    const likes =
        await db
            .select()
            .from(comments)
            .where(eq(comments.userid, userid))

    const dislikes =
        await db
            .select()
            .from(comments)
            .where(eq(comments.userid, userid))

    const reputation = likes.length + dislikes.length
    return { data: reputation };
};
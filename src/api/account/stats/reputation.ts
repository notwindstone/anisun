"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const reputation = async ({ userid }: { userid: string }) => {
    const commentsData =
        await db
            .select()
            .from(comments)
            .where(eq(comments.userid, userid))

    let likes = 0
    let dislikes = 0

    for (const comment of commentsData) {
        likes = likes + (comment.likes?.length ?? 0)
        dislikes = dislikes + (comment.dislikes?.length ?? 0)
    }

    const reputation = likes - dislikes
    return { data: reputation };
};
"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const dislike = async (uuid: string, commentDislikes: []) => {
    await db
        .update(comments)
        .set({
            dislikes: commentDislikes
        })
        .where(eq(comments.uuid, uuid));
};
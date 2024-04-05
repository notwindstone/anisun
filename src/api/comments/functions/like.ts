"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const like = async (uuid: string, userId: string, commentLikes: []) => {
    // @ts-ignore
    commentLikes.push(userId)

    await db
        .update(comments)
        .set({
            likes: commentLikes
        })
        .where(eq(comments.uuid, uuid));
};
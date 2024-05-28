"use server";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const like = async (uuid: string, commentLikes: []) => {
    await db
        .update(comments)
        .set({
            likes: commentLikes
        })
        .where(eq(comments.uuid, uuid));
};
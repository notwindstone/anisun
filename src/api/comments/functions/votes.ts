"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const votes = async (uuid: string) => {
    await db
        .select()
        .from(comments)
        .where(
            eq(comments.uuid, uuid)
        )

    return {
        data: {
            likes: comments.likes,
            dislikes: comments.dislikes
        }
    }
};
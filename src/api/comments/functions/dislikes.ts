"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const dislike = async (uuid: string, userId: string, commentDislikes: [], toRemove?: boolean) => {
    let newCommentDislikes

    if (toRemove) {
        newCommentDislikes = commentDislikes.filter(function (value) {
            return value !== userId
        })
    } else {
        // @ts-ignore
        commentDislikes.push(userId)
        newCommentDislikes = commentDislikes
    }

    await db
        .update(comments)
        .set({
            dislikes: newCommentDislikes
        })
        .where(eq(comments.uuid, uuid));
};
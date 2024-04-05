"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {eq} from 'drizzle-orm';

export const like = async (uuid: string, userId: string, commentLikes: [], toRemove?: boolean) => {
    let newCommentLikes

    if (toRemove) {
        newCommentLikes = commentLikes.filter(function (value) {
            return value !== userId
        })
    } else {
        // @ts-ignore
        commentLikes.push(userId)
        newCommentLikes = commentLikes
    }

    await db
        .update(comments)
        .set({
            likes: newCommentLikes
        })
        .where(eq(comments.uuid, uuid));
};
"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, desc, eq, isNull} from 'drizzle-orm';

export const get = async ({ title, nextCursor = 0 }: { title: string, nextCursor: number }) => {
    const initialLimit = nextCursor === 0 ? 8 : nextCursor

    const data =
        await db
            .select()
            .from(comments)
            .where(
                and(
                    eq(comments.title, title),
                    isNull(comments.parentuuid)
                )
            )
            .orderBy(desc(comments.createdAt))
            .limit(initialLimit)
            .offset(nextCursor);

    if (data.length === 0) {
        return { data: null, nextCursor: nextCursor + 8 }
    }

    for (const comment of data) {
        const childComments = await db
            .select()
            .from(comments)
            .where(eq(comments.parentuuid, comment.uuid))

        data.push(...childComments)
    }

    return { data: data, nextCursor: nextCursor + 8 };
};
"use server";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, count, desc, eq, isNull} from 'drizzle-orm';

export const getParent = async ({ title, nextCursor = 0 }: { title: string, nextCursor: number }) => {
    const countAllComments =
        await db
            .select({ count: count() })
            .from(comments)
            .where(eq(comments.title, title));

    const originComments =
        await db
            .select()
            .from(comments)
            .orderBy(desc(comments.createdAt))
            .where(
                and(
                    eq(comments.title, title),
                    isNull(comments.parentuuid)
                )
            )
            .limit(16)
            .offset(nextCursor);

    if (originComments.length === 0) {
        return { total: countAllComments, data: null, nextCursor: nextCursor + 16 };
    }

    const data = [];

    for (const comment of originComments) {
        const children =
            await db
                .select({ count: count() })
                .from(comments)
                .where(eq(comments.parentuuid, comment.uuid));

        data.push({ ...comment, children: children });
    }

    return { total: countAllComments, data: data, nextCursor: nextCursor + 16 };
};
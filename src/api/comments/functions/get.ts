"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, asc, desc, eq, isNotNull, isNull} from 'drizzle-orm';

export const get = async ({ title, nextCursor = 0 }: { title: string, nextCursor: number }) => {
    const initialLimit = nextCursor === 0 ? 8 : nextCursor

    const originComments =
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

    if (originComments.length === 0) {
        return { data: null, nextCursor: nextCursor + 8 }
    }

    let data = []

    for (const comment of originComments) {
        const children =
            await db
                .select()
                .from(comments)
                .where(
                    and(
                        eq(comments.branch, comment.branch),
                        isNotNull(comments.parentuuid)
                    )
                )
                .orderBy(asc(comments.createdAt))

        data.push({ ...comment, children: children })
    }

    return { data: data, nextCursor: nextCursor + 8 };
};
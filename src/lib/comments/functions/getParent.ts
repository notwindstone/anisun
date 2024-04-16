"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, asc, count, desc, eq, isNull} from 'drizzle-orm';

export const getParent = async ({ title, nextCursor = 0, filters = 'FROM_NEWEST' }: { title: string, nextCursor: number, uuid?: string, filters?: string }) => {
    let order

    switch (filters) {
        case 'FROM_NEWEST':
            order = desc(comments.createdAt)
            break
        case 'FROM_OLDEST':
            order = asc(comments.createdAt)
            break
        case 'MOST_LIKED':
            order = desc(comments.likes)
            break
        default:
            order = desc(comments.createdAt)
            break
    }

    const originComments =
        await db
            .select()
            .from(comments)
            .orderBy(order)
            .where(
                and(
                    eq(comments.title, title),
                    isNull(comments.parentuuid)
                )
            )
            .limit(8)
            .offset(nextCursor);

    if (originComments.length === 0) {
        return { data: null, nextCursor: nextCursor + 8 }
    }

    let data = []

    for (const comment of originComments) {
        const children =
            await db
                .select({ count: count() })
                .from(comments)
                .where(eq(comments.parentuuid, comment.uuid))

        data.push({ ...comment, children: children })
    }

    return { data: data, nextCursor: nextCursor + 8 };
};
"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, asc, count, desc, eq, isNotNull, isNull, sql} from 'drizzle-orm';

export const get = async ({ title, nextCursor = 0, uuid }: { title: string, nextCursor: number, uuid?: string }) => {
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
                .select({ count: count() })
                .from(comments)
                .where(eq(comments.parentuuid, comment.uuid))

        data.push({ ...comment, children: children })
    }

    const experimentalCount = await db.execute(
        sql
            `
                with recursive child as (
                    select * from comments where parentuuid = 'wUsw3NYzo5Dmny6Pqe_Qd'
                )
                select * from child
            `
    )

    console.log(experimentalCount)

    return { data: data, nextCursor: nextCursor + 8 };

    /*
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
     */
};
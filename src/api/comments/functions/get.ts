"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, desc, eq, exists, isNull} from 'drizzle-orm';

export const get = async ({ title, nextCursor = 0 }: { title: string, nextCursor: number }) => {
    const initialLimit = nextCursor === 0 ? 8 : nextCursor
    const data =
        await db
            .select()
            .from(comments)
            .where(
                and(
                    isNull(comments.parentuuid)
                )
            )
            .orderBy(desc(comments.createdAt))
            //.limit(initialLimit)
            //.offset(nextCursor);

    const test = data.map((test1) => {

            return test1.parentuuid

    })

    const childComments =
        await db
            .select()
            .from(comments)
            .where(eq(comments.parentuuid, comments.parentuuid))

    let mergedData = new Set([...data, ...childComments])

    console.log(data.length, mergedData.size, test)

    if (data.length === 0) {
        return { data: null, nextCursor: nextCursor + 8 }
    }
    return { data: data, nextCursor: nextCursor + 8 };
};
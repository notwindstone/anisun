"use server";

import db from "@/db/drizzle";
import {comments} from "@/db/schema";
import {asc, count, eq} from "drizzle-orm";

export const getChildren = async ({ uuid }: { uuid: string }) => {
    const parentComments =
        await db
            .select()
            .from(comments)
            .where(
                eq(comments.parentuuid, uuid),
            )
            .orderBy(asc(comments.createdAt));

    if (parentComments.length === 0) {
        return { data: null };
    }

    const data = [];

    for (const comment of parentComments) {
        const children =
            await db
                .select({ count: count() })
                .from(comments)
                .where(eq(comments.parentuuid, comment.uuid));

        data.push({ ...comment, children: children });
    }

    return { data: data };
};
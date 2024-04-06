"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const totalComments = async ({ userid }: { userid: string }) => {
    const data =
        await db
            .select()
            .from(comments)
            .where(eq(comments.userid, userid))

    return { data: data.length };
};
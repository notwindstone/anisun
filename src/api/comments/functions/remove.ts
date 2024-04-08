"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const remove = async (uuid: string) => {
    await db
        .update(comments)
        .set({
            isDeleted: true
        })
        .where(eq(comments.uuid, uuid));
};
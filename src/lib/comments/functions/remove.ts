"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const remove = async (uuid: string, toRemove: boolean) => {
    await db
        .update(comments)
        .set({
            isDeleted: toRemove
        })
        .where(eq(comments.uuid, uuid));
};
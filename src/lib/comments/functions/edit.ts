"use server";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';

export const edit = async (uuid: string, message: string) => {
    await db
        .update(comments)
        .set({
            message: message,
            isEdited: true,
        })
        .where(eq(comments.uuid, uuid));
};
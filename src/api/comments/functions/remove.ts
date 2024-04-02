"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';
import {revalidatePath} from "next/cache";

export const remove = async (uuid: string) => {
    await db.delete(comments).where(eq(comments.uuid, uuid));
};
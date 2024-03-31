"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {revalidatePath} from "next/cache";

export const addComment = async (avatar: string, username: string, message: string) => {
    await db.insert(comments).values({
        avatar: avatar,
        username: username,
        message: message,
    });

    revalidatePath("/");
};
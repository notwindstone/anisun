"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const add = async (
    uuid: string,
    title: string,
    avatar: string,
    username: string,
    date: string,
    likes: number,
    dislikes: number,
    message: string,
) => {
    await db.insert(comments).values({
        uuid: uuid,
        title: title,
        avatar: avatar,
        username: username,
        date: date,
        likes: likes,
        dislikes: dislikes,
        message: message,
    });

    revalidatePath("/");
};
"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const add = async (
    uuid: string,
    title: string,
    userid: string,
    username: string,
    avatar: string,
    date: string,
    likes: number,
    dislikes: number,
    message: string,
    isDeleted: boolean,
    isEdited: boolean,
) => {
    await db.insert(comments).values({
        uuid: uuid,
        title: title,
        userid: userid,
        username: username,
        avatar: avatar,
        date: date,
        likes: likes,
        dislikes: dislikes,
        message: message,
        isDeleted: isDeleted,
        isEdited: isEdited,
    });

};
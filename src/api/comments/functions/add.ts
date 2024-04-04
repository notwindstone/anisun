"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";

export const add = async (
    uuid: string,
    title: string,
    userid: string,
    username: string,
    avatar: string,
    createdAt: string,
    likes: string[],
    dislikes: string[],
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
        createdAt: createdAt,
        likes: likes,
        dislikes: dislikes,
        message: message,
        isDeleted: isDeleted,
        isEdited: isEdited,
    });

};
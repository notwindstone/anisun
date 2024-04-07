"use server"

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import {and, desc, eq, isNull} from 'drizzle-orm';

interface CommentProps {
    uuid: string;
    parentuuid: string | null;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: unknown[] | null;
    dislikes: unknown[] | null;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
    children?: CommentProps[]
}

export const get = async ({ title, nextCursor = 0 }: { title: string, nextCursor: number }) => {
    const initialLimit = nextCursor === 0 ? 8 : nextCursor

    const originComments =
        await db
            .select()
            .from(comments)
            .where(
                and(
                    eq(comments.title, title),
                    isNull(comments.parentuuid)
                )
            )
            .orderBy(desc(comments.createdAt))
            .limit(initialLimit)
            .offset(nextCursor);

    if (originComments.length === 0) {
        return { data: null, nextCursor: nextCursor + 8 }
    }

    async function nestedComments(comment: CommentProps) {
        const children =
            await db
                .select()
                .from(comments)
                .where(eq(comments.parentuuid, comment.uuid))

        if (children.length === 0) {
            return []
        }

        return await Promise.all(children.map(async (child: CommentProps) => {
            const childrenComments: any = nestedComments(child)

            return {
                ...child,
                children: childrenComments
            }
        }))
    }

    const data = originComments.map((comment) => {
        const children: any = nestedComments(comment)

        return {
            ...comment,
            children: children
        }
    })

    return { data: data, nextCursor: nextCursor + 8 };
};
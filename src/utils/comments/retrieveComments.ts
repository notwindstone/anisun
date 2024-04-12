import {comments} from "@/lib/comments/comments";

export async function retrieveComments({ titleCode, pageParam }: { titleCode: string, pageParam: number }) {
    const data = await comments.get({ title: titleCode, nextCursor: pageParam })
    console.log(data)
    return data
}
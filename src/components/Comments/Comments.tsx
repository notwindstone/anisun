"use client"

import {comments} from "@/api/comments/comments";
import {Loader} from "@mantine/core";
import AddComment from "@/components/Comments/AddComment";
import {useQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";

export default function Comments() {
    const { isPending, data } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            return await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf")
        },
        refetchInterval: 5000
    })

    const commentsData = data ?? []

    const commentsSection = commentsData.map((comment) => {
        return (
            <Comment key={comment.uuid} comment={comment} />
        )
    })

    return (
        <>
            <AddComment />
            {isPending && <Loader color="blue" />}
            {commentsSection}
        </>
    )
}
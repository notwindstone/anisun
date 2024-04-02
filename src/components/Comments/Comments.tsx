"use client"

import {comments} from "@/api/comments/comments";
import {Button, Loader, Skeleton} from "@mantine/core";
import AddComment from "@/components/Comments/AddComment";
import {useQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {useState} from "react";

export default function Comments() {
    const [limit, setLimit] = useState(8)

    const { isPending, data } = useQuery({
        queryKey: ["comments", limit],
        queryFn: async () => {
            return await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf", limit)
        },
        refetchInterval: 5000
    })

    const commentsData = data ?? []

    let commentsSection = commentsData.map((comment) => {
        return (
            <Comment key={comment.uuid} comment={comment} />
        )
    })

    return (
        <>
            <AddComment />
            {isPending && <Loader color="blue" />}
            {commentsSection}
            <Button onClick={() => setLimit(limit + 8)}>Load</Button>
        </>
    )
}
"use client"

import {useEffect, useState} from "react";
import {comments} from "@/api/comments/comments";
import {Avatar, Text} from "@mantine/core";

export default function Comments() {
    const [commentsSection, setCommentsSection] = useState()
    const [refreshToken, setRefreshToken] = useState(Math.random())

    useEffect(() => {
        const refreshComments = async () => {
            const data = await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf")
            const commentsData = data.map((comment) => {
                return (
                    <div key={comment.uuid}>
                        <Text>{comment.uuid}</Text>
                        <Text>{comment.title}</Text>
                        <Avatar src={comment.avatar} size={64} />
                        <Text>{comment.username}</Text>
                        <Text>{comment.date}</Text>
                        <Text>{comment.likes}</Text>
                        <Text>{comment.dislikes}</Text>
                        <Text>{comment.message}</Text>
                    </div>
                )
            })
            // @ts-ignore
            setCommentsSection(commentsData)
            setTimeout(() => setRefreshToken(Math.random()), 5000)
        }
        refreshComments().then()
    }, [refreshToken]);

    return (
        <>
            {commentsSection}
        </>
    )
}
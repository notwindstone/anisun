"use client"

import {useEffect, useState} from "react";
import {comments} from "@/api/comments/comments";
import {Avatar, Group, Text} from "@mantine/core";
import AddComment from "@/components/Comments/AddComment";

export default function Comments() {
    const [commentsSection, setCommentsSection] = useState()
    const [refreshToken, setRefreshToken] = useState(Math.random())

    useEffect(() => {
        const refreshComments = async () => {
            const data = await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf")
            const commentsData = data.map((comment) => {
                return (
                    <div key={comment.uuid}>
                        <Group>
                            <Avatar src={comment.avatar} size={64} />
                            <Group>
                                <Text>{comment.uuid}</Text>
                                <Text>{comment.title}</Text>
                                <Text>{comment.username}</Text>
                                <Text>{comment.date}</Text>
                                <Text>{comment.likes}</Text>
                                <Text>{comment.dislikes}</Text>
                            </Group>
                            <Text>{comment.message}</Text>
                        </Group>

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
            <AddComment />
            {commentsSection}
        </>
    )
}
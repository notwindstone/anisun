"use client"

import Link from "next/link";
import {comments} from "@/api/comments/comments";
import {Avatar, Text} from "@mantine/core";
import {useEffect, useState} from "react";

async function getComments() {
    // const uuid = nanoid()
    // const date = new Date().toJSON()
    return await comments.get()
}

export default function Home() {
    const [commentsSection, setCommentsSection] = useState()
    const [refreshToken, setRefreshToken] = useState(Math.random())

    useEffect(() => {
        const refreshComments = async () => {
            const data = await getComments()
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
            setTimeout(() => setRefreshToken(Math.random()), 3000)
        }
        refreshComments().then()
    }, [refreshToken]);

    return (
        <>
            <Link href="/titles">Test</Link>
            {commentsSection}
        </>
    )
}
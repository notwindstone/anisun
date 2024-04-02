import Link from "next/link";
import {comments} from "@/api/comments/comments";
import {Avatar, Text} from "@mantine/core";


export default async function Home() {
    const data = await comments.get()

    const commentsSection = data.map((comment) => {
        return (
            <div key={comment.id}>
                <Text>{comment.id}</Text>
                <Avatar src={comment.avatar} size={64} />
                <Text>{comment.username}</Text>
                <Text>{comment.message}</Text>
            </div>
        )
    })
    return (
        <>
            <Link href="/titles">Test</Link>
            {commentsSection}
        </>
    )
}
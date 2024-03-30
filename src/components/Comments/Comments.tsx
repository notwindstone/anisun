import {getComments} from "@/api/comments/getComments";
import {Avatar, Text} from "@mantine/core";

export default async function Comments() {
    const commentsData = await getComments()

    const comments = commentsData.map((comment) => {
        return (
            <div key={comment.id}>
                <Text>{comment.id}</Text>
                <Avatar src={comment.avatar}/>
                <Text>{comment.username}</Text>
                <Text>{comment.message}</Text>
            </div>
        )
    })

    return (
        <div>
            {comments}
        </div>
    )
}
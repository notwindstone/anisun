import {getComments} from "@/api/comments/getComments";
import {Avatar, Text} from "@mantine/core";
import {deleteComment} from "@/api/comments/deleteComment";

export default async function Comments() {
    const commentsData = await getComments()
    console.log(commentsData)
    await deleteComment(1)
    console.log(commentsData)
    const comments = commentsData.map((comment) => {
        return (
            <div key={comment.id}>
                <Text>{comment.id}</Text>
                <Avatar src={comment.avatar} />
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
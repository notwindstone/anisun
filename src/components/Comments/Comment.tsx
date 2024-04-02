import {Avatar, Group, Text} from "@mantine/core";

interface CommentProps {
    uuid: string;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    date: string;
    likes: number | null;
    dislikes: number | null;
    message: string;
    isDeleted: boolean | null;
    isEdited: boolean | null;
}

export default function Comment({ comment }: { comment: CommentProps }) {
    console.log(comment.uuid, comment)

    return (
        <Group key={comment.uuid}>
            <Avatar src={comment.avatar} size={64}/>
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
    )
}
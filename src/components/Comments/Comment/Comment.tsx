import {CommentType} from "@/types/CommentType";
import {Avatar, Button, Flex, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import {ChildCommentList} from "@/components/Comments/ChildCommentList/ChildCommentList";
import classes from "./Comment.module.css";
import Link from "next/link";
import {makeDate} from "@/utils/makeDate";
import {makeWordEnding} from "@/utils/makeWordEnding";
import {useDisclosure} from "@mantine/hooks";
import {VoteComment} from "@/components/Comments/VoteComment/VoteComment";
import {UserResource} from "@clerk/types";

export function Comment({ comment, user, isUser }: { comment: CommentType, user: UserResource | null | undefined, isUser: boolean }) {
    const [isExpandedChild, { toggle: toggleChild }] = useDisclosure(false)
    const [isToggledReply, { toggle: toggleReply }] = useDisclosure(false)

    function handleNewVotes({ likes, dislikes }: { likes?: unknown[], dislikes?: unknown[] }) {
        //mutation.mutate(newComment)
        console.log(`likes: ${likes}, dislikes: ${dislikes}`)
    }

    const children = comment.children ? comment.children[0].count : 0

    const hasOneChild = children === 1
    const hasMoreThanOneChild = children > 1

    return (
        <div>
            <Flex className={classes.root}>
                <Link href={`/account/${comment.userid}`}>
                    <Avatar src={comment.avatar} size={64}/>
                </Link>
                <Stack>
                    <Group>
                        <Link href={`/account/${comment.userid}`}>
                            <Text>{comment.username}</Text>
                        </Link>
                        <Text>{makeDate(comment.createdAt)}</Text>
                    </Group>
                    <Group>
                        <Text>{comment.message}</Text>
                    </Group>
                    <Group>
                        <VoteComment
                            uuid={comment.uuid}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                            sendVotes={handleNewVotes}
                            user={user}
                            isUser={isUser}
                        />

                        <Button onClick={toggleReply}>Ответить</Button>
                    </Group>
                </Stack>
            </Flex>
            {
                isToggledReply && <>Ответ</>
            }
            {
                /*
                 * Если к комментарию только 1 ответ, то он автоматически загрузится
                 * Если к комментарию больше 1 ответа, то будет показана кнопка "Раскрыть {число} ответов"
                 * В ином случае (т.е. ответов нет) ничего не выведется
                 * */
                hasOneChild
                    ? (
                        <ChildCommentList uuid={comment.uuid} childComments={children} />
                    )
                    : hasMoreThanOneChild
                        ? (
                            <>
                                <UnstyledButton
                                    onClick={toggleChild}
                                >
                                    {
                                        isExpandedChild ? "Свернуть" : `Раскрыть ${children} ${makeWordEnding(children)}`
                                    }
                                </UnstyledButton>
                                {isExpandedChild && (<ChildCommentList uuid={comment.uuid} childComments={children} />)}
                            </>
                        )
                        : null
            }
        </div>
    )
}
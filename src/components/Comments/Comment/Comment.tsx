import {CommentType} from "@/types/CommentType";
import {ActionIcon, Avatar, Button, Flex, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import {ChildCommentList} from "@/components/Comments/ChildCommentList/ChildCommentList";
import classes from "./Comment.module.css";
import Link from "next/link";
import {makeDate} from "@/utils/makeDate";
import {IconCaretDownFilled, IconCaretUpFilled} from "@tabler/icons-react";
import {makeWordEnding} from "@/utils/makeWordEnding";
import {useDisclosure} from "@mantine/hooks";

export function Comment({ comment }: { comment: CommentType }) {
    const [isExpandedChild, { toggle: toggleChild }] = useDisclosure(false)
    const [isToggledReply, { toggle: toggleReply }] = useDisclosure(false)

    const children = comment.children ? comment.children[0].count : 0

    const hasOneChild = children === 1
    const hasMoreThanOneChild = children > 1

    return (
        <div>
            <Flex className={classes.root}>
                <Group>
                    <Link href={`/account/${comment.userid}`}>
                        <Avatar src={comment.avatar} size={64}/>
                    </Link>
                </Group>
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
                        <ActionIcon>
                            <IconCaretUpFilled />
                        </ActionIcon>
                        <Text>{comment.likes?.length}</Text>

                        <ActionIcon>
                            <IconCaretDownFilled />
                        </ActionIcon>
                        <Text>{comment.dislikes?.length}</Text>

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
                        <ChildCommentList uuid={comment.uuid} />
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
                                {isExpandedChild && (<ChildCommentList uuid={comment.uuid} />)}
                            </>
                        )
                        : null
            }
        </div>
    )
}
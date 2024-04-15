import {IconCaretDownFilled, IconCaretUpFilled} from "@tabler/icons-react";
import {ActionIcon, Text} from "@mantine/core";
import {UserResource} from "@clerk/types";
import {useState} from "react";
import {notify} from "@/utils/notify/notify";
import {comments} from "@/lib/comments/comments";

export function VoteComment({ uuid, likes, dislikes, sendVotes, user, isUser }: { uuid: string, likes: unknown[] | null, dislikes: unknown[] | null, sendVotes: ({ likes, dislikes }: { likes?: unknown[], dislikes?: unknown[] }) => void, user: UserResource | null | undefined, isUser: boolean }) {
    const [delayed, setDelayed] = useState(false)

    const isLiked = likes?.includes(user?.id)
    const isDisliked = dislikes?.includes(user?.id)

    const handleChecks = () => {
        if (delayed) {
            notify.delay()

            return false
        }

        if (!isUser || !user) {
            notify.notAuthenticated()

            return false
        }

        return true
    }

    const handleLike = async () => {
        if (!handleChecks()) {
            return
        }

        setDelayed(true)

        if (isDisliked) {
            handleDislike().then()
        }

        const definedCommentLikes = likes ?? []

        if (isLiked) {
            const mutatedCommentLikes = definedCommentLikes.filter((userid) => {
                return userid !== user?.id
            })

            sendVotes({ likes: mutatedCommentLikes })

            // @ts-ignore
            await comments.like(uuid, mutatedCommentLikes)

            return setTimeout(() => {
                setDelayed(false)
            }, 500)
        }

        const mutatedCommentLikes = definedCommentLikes

        mutatedCommentLikes.push(user?.id)

        sendVotes({ likes: mutatedCommentLikes })

        // @ts-ignore
        await comments.like(uuid, mutatedCommentLikes)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    const handleDislike = async () => {
        if (!handleChecks()) {
            return
        }

        setDelayed(true)

        if (isLiked) {
            handleLike().then()
        }

        console.log('oops')
    }

    return (
        <>
            <ActionIcon
                variant={
                    isLiked
                        ? "filled"
                        : "default"
                }
                onClick={handleLike}
            >
                <IconCaretUpFilled />
            </ActionIcon>

            <Text>{likes?.length}</Text>

            <ActionIcon
                variant={
                    isDisliked
                        ? "filled"
                        : "default"
                }
                onClick={handleDislike}
            >
                <IconCaretDownFilled />
            </ActionIcon>

            <Text>{dislikes?.length}</Text>
        </>
    )
}
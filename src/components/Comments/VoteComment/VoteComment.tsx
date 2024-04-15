import {IconCaretDownFilled, IconCaretUpFilled} from "@tabler/icons-react";
import {ActionIcon, Text} from "@mantine/core";
import {UserResource} from "@clerk/types";
import {useState} from "react";
import {notify} from "@/utils/notify/notify";

export function VoteComment({ uuid, likes, dislikes, sendComment, user, isUser }: { uuid: string, likes: unknown[] | null, dislikes: unknown[] | null, sendComment: (likes: string[]) => void, user: UserResource | null | undefined, isUser: boolean }) {
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

        console.log('oops')
    }

    const handleDislike = async () => {
        if (!handleChecks()) {
            return
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
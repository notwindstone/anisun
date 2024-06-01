import {IconCaretDownFilled, IconCaretUpFilled} from "@tabler/icons-react";
import {ActionIcon, Group, rem, Text} from "@mantine/core";
import {useState} from "react";
import {notify} from "@/utils/Notifications/notify";
import {comments} from "@/lib/comments/comments";
import {useUser} from "@clerk/nextjs";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './VoteComment.module.css';

export function VoteComment({ uuid, likes, dislikes, sendVotes }: { uuid: string, likes: unknown[] | null, dislikes: unknown[] | null, sendVotes: ({ newLikes, newDislikes }: { newLikes?: unknown[], newDislikes?: unknown[] }) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false);
    const { theme } = useCustomTheme();

    const isUser = isLoaded && isSignedIn;

    likes = likes ?? [];
    dislikes = dislikes ?? [];

    const isLiked = likes.includes(user?.id);
    const isDisliked = dislikes.includes(user?.id);

    const handleChecks = () => {
        if (delayed) {
            notify.delay();

            return false;
        }

        if (!isUser || !user) {
            notify.notAuthenticated();

            return false;
        }

        return true;
    };

    const handleLike = async () => {
        if (!handleChecks()) {
            return;
        }

        setDelayed(true);

        if (isDisliked) {
            handleDislike().then();
        }

        if (isLiked) {
            const mutatedCommentLikes = likes.filter((userid) => {
                return userid !== user?.id;
            });

            sendVotes({ newLikes: mutatedCommentLikes });

            // @ts-ignore
            await comments.like(uuid, mutatedCommentLikes);

            return setTimeout(() => {
                setDelayed(false);
            }, 500);
        }

        const mutatedCommentLikes = [...likes];

        mutatedCommentLikes.push(user?.id);

        sendVotes({ newLikes: mutatedCommentLikes });

        // @ts-ignore
        await comments.like(uuid, mutatedCommentLikes);

        return setTimeout(() => {
            setDelayed(false);
        }, 500);
    };

    const handleDislike = async () => {
        if (!handleChecks()) {
            return;
        }

        setDelayed(true);

        if (isLiked) {
            handleLike().then();
        }

        if (isDisliked) {
            const mutatedCommentDislikes = dislikes.filter((userid) => {
                return userid !== user?.id;
            });

            sendVotes({ newDislikes: mutatedCommentDislikes });

            // @ts-ignore
            await comments.dislike(uuid, mutatedCommentDislikes);

            return setTimeout(() => {
                setDelayed(false);
            }, 500);
        }

        const mutatedCommentDislikes = [...dislikes];

        mutatedCommentDislikes.push(user?.id);

        sendVotes({ newDislikes: mutatedCommentDislikes });

        // @ts-ignore
        await comments.dislike(uuid, mutatedCommentDislikes);

        return setTimeout(() => {
            setDelayed(false);
        }, 500);
    };

    return (
        <>
            <Group className={classes.group} gap={rem(16)}>
                <ActionIcon
                    classNames={{
                        root: classes.iconWrapper,
                        icon: classes.iconWrapper,
                    }}
                    autoContrast
                    color={theme.color}
                    variant={
                        isLiked
                            ? "filled"
                            : "default"
                    }
                    onClick={handleLike}
                >
                    <IconCaretUpFilled className={classes.icon} size={20} stroke={1.5} />
                </ActionIcon>
                <Text className={classes.text}>
                    {likes?.length}
                </Text>
                <ActionIcon
                    classNames={{
                        root: classes.iconWrapper,
                        icon: classes.iconWrapper,
                    }}
                    autoContrast
                    color={theme.color}
                    variant={
                        isDisliked
                            ? "filled"
                            : "default"
                    }
                    onClick={handleDislike}
                >
                    <IconCaretDownFilled className={classes.icon} size={20} stroke={1.5} />
                </ActionIcon>
                <Text className={classes.text}>
                    {dislikes?.length}
                </Text>
            </Group>
        </>
    );
}
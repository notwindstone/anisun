import {useRef, useState} from "react";
import {Flex, Paper, Textarea} from "@mantine/core";
import {notify} from "@/utils/Notifications/notify";
import {nanoid} from "nanoid";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/Comments/Comment.type";
import {useUser} from "@clerk/nextjs";
import classes from './AddComment.module.css';
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useTranslations} from "next-intl";

export function AddComment({ title, parentUUID, sendComment }: { title: string, parentUUID: string | null, sendComment: (comment: CommentType) => void }) {
    const translate = useTranslations('Translations');
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false);

    const isUser = isLoaded && isSignedIn;

    const handleSubmit = async () => {
        if (delayed) {
            return notify.delay();
        }

        if (!isUser || !user) {
            return notify.notAuthenticated();
        }

        const message = ref.current?.value ?? "";

        if (message.length < 1 || message.length > 2000) {
            return notify.incorrectInput();
        }

        setDelayed(true);

        const notificationId = nanoid();

        notify.loading(notificationId, true);

        const uuid = nanoid();
        const createdAt = new Date().toJSON();

        const userId = user?.id;
        const username = user?.username ?? translate('common__no-nickname-label');
        const avatar = user?.imageUrl;
        const children = [{ count: 0 }];

        const comment = {
            uuid: uuid,
            parentuuid: parentUUID,
            title: title,
            userid: userId,
            username: username,
            avatar: avatar,
            createdAt: createdAt,
            likes: [],
            dislikes: [],
            message: message,
            isDeleted: false,
            isEdited: false,
            children: children
        };

        sendComment(comment);

        await comments.add(
            uuid,
            parentUUID,
            title,
            userId,
            username,
            avatar,
            createdAt,
            [],
            [],
            message,
            false,
            false,
        );

        notify.loading(notificationId, false);

        setTimeout(() => {
            setDelayed(false);
        }, 5000);
    };

    return (
        <Paper className={classes.root}>
            <Textarea
                classNames={{
                    wrapper: classes.wrapper,
                    input: classes.input,
                }}
                ref={ref}
                placeholder={
                    isUser
                        ? translate('component__add-comment__write-label')
                        : translate('component__add-comment__no-account-label')
                }
                autosize
                required
                minRows={2}
            />
            <Flex justify="flex-end">
                <DecoratedButton
                    className={classes.submit}
                    onClick={handleSubmit}
                    variant="filled"
                    disabled={!isUser}
                >
                    {translate('common__send-label')}
                </DecoratedButton>
            </Flex>
        </Paper>
    );
}
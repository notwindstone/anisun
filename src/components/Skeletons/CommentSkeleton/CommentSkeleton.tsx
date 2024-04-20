import {Flex, Group, Skeleton, Stack} from "@mantine/core";
import classes from './CommentSkeleton.module.css'

export default function CommentSkeleton() {
    return (
        <Flex className={classes.root}>
            <Skeleton height={64} circle visible />
            <Stack className={classes.content}>
                <Flex className={classes.info}>
                    <Skeleton className={classes.skeleton} radius="xl" height={20} width={160} />
                    <Skeleton className={classes.skeleton} radius="xl" height={20} width={96} />
                </Flex>
                <Skeleton className={classes.skeleton} radius="xl" height={20} width={512} />
                <Group>
                    <Skeleton className={classes.skeleton} radius="xl" height={20} width={64} />
                    <Skeleton className={classes.skeleton} radius="xl" height={20} width={64} />
                </Group>
            </Stack>
        </Flex>
    )
}
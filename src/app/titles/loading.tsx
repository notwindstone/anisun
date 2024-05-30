import {AspectRatio, Group, rem, Skeleton, Stack} from "@mantine/core";
import classes from "@/app/titles/[code]/page.module.css";
import VideoSkeleton from "@/components/Video/VideoSkeleton/VideoSkeleton";

const MOCK_VIDEOS = Array.from({ length: 8 });

export default function Loading() {
    return (
        <>
            <Group
                className={classes.group}
                align="flex-start"
                gap={rem(16)}
            >
                <Stack className={classes.primary} flex={1}>'
                    <Stack p={0} gap={rem(8)}>
                        <AspectRatio ratio={16 / 9}>
                            <div className={classes.placeholder}/>
                            <div className={classes.playerInner}>
                                <VideoSkeleton />
                            </div>
                        </AspectRatio>
                    </Stack>
                </Stack>
            </Group>
            <Stack gap={rem(8)} className={classes.similar}>
                {
                    MOCK_VIDEOS.map((_mockVideo, index) => {
                        return (
                            <Group
                                className={classes.similarGroup}
                                key={index}
                                align="flex-start"
                            >
                                <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                                    <Skeleton
                                        radius="md"
                                        width="100%"
                                        height="100%"
                                    />
                                </AspectRatio>
                                <Stack className={classes.similarStack} h="100%" justify="flex-start">
                                    <Skeleton width="80%" height={rem(20)} />
                                    <Skeleton width="60%" height={rem(12)} />
                                    <Skeleton width="60%" height={rem(12)} />
                                </Stack>
                            </Group>
                        );
                    })
                }
            </Stack>
        </>
    );
}
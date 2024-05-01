import {AspectRatio, Flex, Image, rem, Skeleton, Stack} from "@mantine/core";
import classes from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard.module.css";

export default function AnimeVideoSkeleton() {
    return (
        <div>
            <Stack className={classes.root}>
                <Skeleton radius="lg">
                    <Image
                        alt="Заглушка"
                        className={classes.poster}
                        width={270}
                        height={180}
                    />
                </Skeleton>
                <Flex direction="row" gap={rem(16)}>
                    <Skeleton circle width={64} height={64} />
                    <Stack gap={rem(24)} pb={rem(32)}>
                        <Skeleton radius="xl" width={180} height={24} />
                        <Skeleton radius="xl" width={128} height={18} />
                        <Skeleton radius="xl" width={32} height={18} />
                        <Skeleton radius="xl" width={96} height={18} />
                    </Stack>
                </Flex>
            </Stack>
        </div>
    )
}
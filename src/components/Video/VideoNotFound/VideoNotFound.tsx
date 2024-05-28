import {AspectRatio, Box, Center, Group, Stack, Text} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import classes from './VideoNotFound.module.css';

export default function VideoNotFound() {
    return (
        <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
            <Center w="100%" h="100%">
                <Group className={classes.group}>
                    <Box className={classes.iconWrapper}>
                        <IconAlertCircle className={classes.icon} />
                    </Box>
                    <Stack className={classes.stack}>
                        <Text className={classes.title}>
                            Видео недоступно
                        </Text>
                        <Text className={classes.subtitle}>
                            Попробуйте выбрать другой плеер
                        </Text>
                    </Stack>
                </Group>
            </Center>
        </AspectRatio>
    );
}
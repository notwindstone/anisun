import {AspectRatio, Box, Center, Group, Stack, Text} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import classes from './VideoNotFound.module.css';
import {useTranslations} from "next-intl";

export default function VideoNotFound() {
    const translate = useTranslations('Translations');

    return (
        <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
            <Center w="100%" h="100%">
                <Group className={classes.group}>
                    <Box className={classes.iconWrapper}>
                        <IconAlertCircle className={classes.icon} />
                    </Box>
                    <Stack className={classes.stack}>
                        <Text className={classes.title}>
                            {translate('component__video-not-found__title-label')}
                        </Text>
                        <Text className={classes.subtitle}>
                            {translate('component__video-not-found__description-label')}
                        </Text>
                    </Stack>
                </Group>
            </Center>
        </AspectRatio>
    );
}
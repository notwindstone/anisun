import {AspectRatio, Center, Group, rem, Stack, Text} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";

export default function VideoNotFound() {
    return (
        <AspectRatio ratio={16 / 9}>
            <Center w="100%" h="100%">
                <Group>
                    <IconAlertCircle size={rem(64)} />
                    <Stack gap={rem(8)}>
                        <Text fw={500} c="white" size={rem(28)}>
                            Видео недоступно
                        </Text>
                        <Text size={rem(18)}>
                            Попробуйте выбрать другой плеер
                        </Text>
                    </Stack>
                </Group>
            </Center>
        </AspectRatio>
    );
}
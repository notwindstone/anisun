import {Group, rem, Stack} from "@mantine/core";

export default function Page() {
    return (
        <>
            <Group
                gap={rem(16)}
            >
                <Stack
                    flex={2}
                >
                    <div>1</div>
                </Stack>
                <Stack flex={1}>
                    <div>2</div>
                </Stack>
            </Group>
        </>
    );
}
import {Center, Stack, Text, Title} from "@mantine/core";

export default function Page() {
    return (
        <>
            <Center w="100%" h="100svh">
                <Stack align="center" w="75%">
                    <Title>
                        Unable to connect to the Internet
                    </Title>
                    <Text>
                        The page can be loaded once the device connects to a network.
                    </Text>
                </Stack>
            </Center>
        </>
    );
}
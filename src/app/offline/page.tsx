import {Center, Stack, Text, Title} from "@mantine/core";

export default function Page() {
    return (
        <>
            <Center w="100%" h="100svh">
                <Stack w="75%">
                    <Title>
                        Ошибка
                    </Title>
                    <Text>
                        Убедитесь, что присутствует интернет-соединение, и попробуйте перезайти в приложение.
                    </Text>
                </Stack>
            </Center>
        </>
    );
}
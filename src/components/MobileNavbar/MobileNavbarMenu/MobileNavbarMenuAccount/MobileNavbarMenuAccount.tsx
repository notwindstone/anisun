import {Avatar, Box, Group, rem, Stack} from "@mantine/core";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {SignedIn, SignedOut, SignOutButton, useUser} from "@clerk/nextjs";
import {IconUserCircle} from "@tabler/icons-react";
import NProgress from "nprogress";

export default function MobileNavbarMenuAccount({ close }: { close: () => void }) {
    const { user } = useUser();

    function signOut() {
        NProgress.start();
        NProgress.done();
        close();
    }

    function signIn() {
        openSignIn();
        close();
    }

    function signUp() {
        openSignUp();
        close();
    }

    return (
        <>
            <Stack w="100%" align="center" justify="space-between">
                <Stack align="center" gap={rem(8)}>
                    <SignedIn>
                        <Avatar
                            src={user?.imageUrl ?? '/blurred.png'}
                            size={rem(64)}
                            alt={`Аватар пользователя ${user?.username}`}
                        >
                            {user?.username?.[0]}
                        </Avatar>
                    </SignedIn>
                    <SignedOut>
                        <Box
                            w={rem(64)}
                            h={rem(64)}
                        >
                            <IconUserCircle size={64} stroke={1.5} />
                        </Box>
                        <Group>
                            <DecoratedButton onClick={signIn}>
                                Войти
                            </DecoratedButton>
                            <DecoratedButton onClick={signUp}>
                                Зарегистрироваться
                            </DecoratedButton>
                        </Group>
                    </SignedOut>
                </Stack>
                <SignedIn>
                    <SignOutButton>
                        <DecoratedButton onClick={signOut} color="red">
                            Выйти
                        </DecoratedButton>
                    </SignOutButton>
                </SignedIn>
            </Stack>
        </>
    );
}
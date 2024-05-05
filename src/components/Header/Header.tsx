"use client"

import {
    ActionIcon,
    Avatar, Button,
    Divider,
    em,
    Flex,
    Group,
    HoverCard,
    Image, NavLink,
    Popover,
    rem,
    Stack,
    Text,
    Title, UnstyledButton
} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import {IconChevronDown, IconLogout, IconSearch, IconSettings, IconUser, IconUserCircle} from "@tabler/icons-react";
import {useHeadroom, useMediaQuery} from "@mantine/hooks";
import classes from './Header.module.css';
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import {SignedIn, SignedOut, SignInButton, SignUpButton, useUser} from "@clerk/nextjs";

export default function Header() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const pinned = useHeadroom({ fixedAt: 120 })
    const { user } = useUser();

    // isMobile является undefined при первоначальной загрузке страницы
    // поэтому при использовании условия !isMobile, а не isMobile === false
    // этот компонент показывается на пару секунд даже на мобильных устройствах
    return isMobile === false && (
        <Flex
            justify="space-between"
            align="center"
            className={classes.header}
            style={{ transform: `translate3d(0, ${pinned ? 0 : rem(-96)}, 0)` }}
        >
            <Group justify="flex-start">
                <Image
                    alt="Animeth website icon"
                    src="/favicon.png"
                    radius="xl"
                    w={48}
                    h={48}
                    component={NextImage}
                    width={48}
                    height={48}
                    placeholder="blur"
                    blurDataURL={globalVariables.imagePlaceholder}
                />
                <Title>Animeth</Title>
            </Group>
            <Group justify="flex-end">
                <SearchBar />
                <ColorSchemeControl />
                <SignedIn>
                    <Popover transitionProps={{ transition: 'fade-up' }} width={280} shadow="md">
                        <Popover.Target>
                            <Avatar
                                className={classes.avatar}
                                src={user?.imageUrl ?? '/missing-image.png'}
                                alt={`Аватар пользователя ${user?.username}`}
                                size={48}
                            >
                                {user?.username?.[0]}
                            </Avatar>
                        </Popover.Target>
                        <Popover.Dropdown className={classes.dropdown}>
                            <Stack p={rem(8)} gap={0}>
                                <Group pb={rem(8)}>
                                    <Avatar
                                        src={user?.imageUrl ?? '/missing-image.png'}
                                        alt={`Аватар пользователя ${user?.username}`}
                                        size={48}
                                    >
                                        {user?.username?.[0]}
                                    </Avatar>
                                    <Title order={4}>{user?.username}</Title>
                                </Group>
                                <UnstyledButton
                                    pt={rem(8)}
                                    pb={rem(8)}
                                >
                                    <Group align="center">
                                        <IconUserCircle />
                                        <Text>Мой профиль</Text>
                                    </Group>
                                </UnstyledButton>
                                <UnstyledButton
                                    pt={rem(8)}
                                    pb={rem(8)}
                                >
                                    <Group align="center">
                                        <IconSettings />
                                        <Text>Настройки</Text>
                                    </Group>
                                </UnstyledButton>
                                <UnstyledButton
                                    pt={rem(8)}
                                >
                                    <Group align="center">
                                        <IconLogout />
                                        <Text>Выйти</Text>
                                    </Group>
                                </UnstyledButton>
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
            </Group>
        </Flex>
    )
}
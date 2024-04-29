"use client"

import {ActionIcon, Button, em, Flex, Group, Image, Title, UnstyledButton} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import {IconSearch, IconUser} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";

export default function Header() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    if (isMobile) {
        return
    }

    return (
        <header>
            <Flex
                justify="space-between"
                align="center"
            >
                <Group>
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
                    <UnstyledButton>Перейти</UnstyledButton>
                </Group>
                <Group>
                    <ActionIcon radius="xl">
                        <IconSearch />
                    </ActionIcon>
                    <ActionIcon radius="xl">
                        <IconUser />
                    </ActionIcon>
                </Group>
            </Flex>
        </header>
    )
}
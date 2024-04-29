"use client"

import {ActionIcon, Button, Flex, Group, Image, Title, UnstyledButton} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import {IconSearch, IconUser} from "@tabler/icons-react";

export default function Header() {
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
                        w={48}
                        h={48}
                        component={NextImage}
                        width={48}
                        height={48}
                        placeholder="blur"
                        blurDataURL={globalVariables.imagePlaceholder}
                    />
                    <Title>Animeth</Title>
                    <UnstyledButton>Страницы</UnstyledButton>
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
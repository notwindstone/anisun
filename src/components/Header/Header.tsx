"use client"

import {ActionIcon, Divider, em, Flex, Group, HoverCard, Image, rem, Stack, Text, Title} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import {IconChevronDown, IconSearch, IconUser} from "@tabler/icons-react";
import {useHeadroom, useMediaQuery} from "@mantine/hooks";
import classes from './Header.module.css';
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";

export default function Header() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const pinned = useHeadroom({ fixedAt: 120 })

    // isMobile является undefined при первоначальной загрузке страницы
    // поэтому при использовании условия !isMobile, а не isMobile === false
    // этот компонент показывается на пару секунд даже на мобильных устройствах
    return isMobile === false && (
        <Flex
            justify="space-between"
            align="center"
            className={classes.header}
            style={{ transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)` }}
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
                <ActionIcon radius="xl">
                    <IconUser />
                </ActionIcon>
            </Group>
        </Flex>
    )
}
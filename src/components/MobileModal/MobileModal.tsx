'use client'

import {useMediaQuery} from "@mantine/hooks";
import {ActionIcon, Button, em, Flex, Text} from "@mantine/core";
import classes from './MobileModal.module.css';
import {IconMenu2, IconSearch, IconUser} from "@tabler/icons-react";

export default function MobileModal() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    if (!isMobile) {
        return
    }

    return (
        <div className={classes.wrapper}>
            <Flex
                className={classes.root}
                justify="space-between"
                align="center"
            >
                <ActionIcon>
                    <IconMenu2 />
                </ActionIcon>
                <Button leftSection={<IconSearch />}>
                    <Text>Поиск</Text>
                </Button>
                <ActionIcon>
                    <IconUser />
                </ActionIcon>
            </Flex>
        </div>
    );
}
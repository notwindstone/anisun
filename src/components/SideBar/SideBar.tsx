"use client"

import {useMediaQuery} from "@mantine/hooks";
import {ActionIcon, em, Stack, Tooltip} from "@mantine/core";
import {IconHomeFilled} from "@tabler/icons-react";
import classes from './SideBar.module.css';

export default function SideBar() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return isMobile === false && (
        <>
            <aside className={classes.sidebar}>
                <Stack>
                    <Tooltip
                        color="gray"
                        withArrow
                        position="right"
                        label="Главная"
                        transitionProps={{ transition: 'fade-right' }}
                    >
                        <ActionIcon>
                            <IconHomeFilled />
                        </ActionIcon>
                    </Tooltip>
                </Stack>
            </aside>
        </>
    )
}
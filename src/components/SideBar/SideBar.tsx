"use client"

import {useMediaQuery} from "@mantine/hooks";
import {ActionIcon, em, Stack, Tooltip} from "@mantine/core";
import {IconHomeFilled} from "@tabler/icons-react";
import classes from './SideBar.module.css';
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";

export default function SideBar() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return isMobile === false && (
        <>
            <aside className={classes.sidebar}>
                <Stack
                    justify="flex-start"
                    align="center"
                >
                    <SideBarButton />
                </Stack>
            </aside>
        </>
    )
}
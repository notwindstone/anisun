"use client"

import {useMediaQuery} from "@mantine/hooks";
import {useRouter} from "next/navigation";
import classes from './NavigationControl.module.css';
import {Box, em, Group, rem} from "@mantine/core";
import NavigationButton from "@/components/NavigationControl/NavigationButton/NavigationButton";
import NavigationBreadcrumbs from "@/components/NavigationControl/NavigationBreadcrumbs/NavigationBreadcrumbs";

export default function NavigationControl() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return isMobile === false && (
        <>
            <div className={classes.wrapper}>
                <Box className={classes.inner}>
                    <Group gap={rem(16)}>
                        <Group gap={rem(8)}>
                            <NavigationButton type="back" />
                            <NavigationButton type="forward" />
                        </Group>
                        <NavigationBreadcrumbs />
                    </Group>
                </Box>
            </div>
        </>
    )
}
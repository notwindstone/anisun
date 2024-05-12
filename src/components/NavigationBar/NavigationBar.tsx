"use client"

import {Box, em, Group, rem, UnstyledButton} from "@mantine/core";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import classes from './NavigationBar.module.css';
import NavigationBreadcrumbs from "@/components/NavigationBar/NavigationBreadcrumbs/NavigationBreadcrumbs";
import {useMediaQuery} from "@mantine/hooks";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import useRipple from "use-ripple-hook";

export default function NavigationBar() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const router = useRouter()
    const [rippleFirst, eventFirst] = useRipple();
    const [rippleSecond, eventSecond] = useRipple();

    return isMobile === false && (
        <>
            <div className={classes.wrapper}>
                <Box className={classes.inner}>
                    <Group gap={rem(16)}>
                        <Group gap={rem(8)}>
                            <UnstyledButton
                                ref={rippleFirst}
                                onPointerDown={eventFirst}
                                className={classes.button}
                                onClick={() => {
                                    NProgress.start()
                                    router.back()
                                    NProgress.done()
                                }}
                            >
                                <IconChevronLeft size={32} stroke={1.5}/>
                            </UnstyledButton>
                            <UnstyledButton
                                ref={rippleSecond}
                                onPointerDown={eventSecond}
                                className={classes.button}
                                onClick={() => {
                                    NProgress.start()
                                    router.forward()
                                    NProgress.done()
                                }}
                            >
                                <IconChevronRight size={32} stroke={1.5}/>
                            </UnstyledButton>
                        </Group>
                        <NavigationBreadcrumbs/>
                    </Group>
                </Box>
            </div>
        </>
    )
}
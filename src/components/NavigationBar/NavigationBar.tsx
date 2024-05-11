"use client"

import {em, Group, rem, UnstyledButton} from "@mantine/core";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import classes from './NavigationBar.module.css';
import NavigationBreadcrumbs from "@/components/NavigationBar/NavigationBreadcrumbs/NavigationBreadcrumbs";
import {useMediaQuery} from "@mantine/hooks";

export default function NavigationBar() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const router = useRouter()

    return isMobile === false && (
        <div className={classes.wrapper}>
            <Group gap={rem(8)}>
                <UnstyledButton
                    onClick={() => {
                        NProgress.start()
                        router.back()
                        NProgress.done()
                    }}
                >
                    Back
                </UnstyledButton>
                <UnstyledButton
                    onClick={() => {
                        NProgress.start()
                        router.forward()
                        NProgress.done()
                    }}
                >
                    Forward
                </UnstyledButton>
                <NavigationBreadcrumbs />
            </Group>
        </div>
    )
}
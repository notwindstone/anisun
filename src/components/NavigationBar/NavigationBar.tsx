"use client"

import {Group, rem, UnstyledButton} from "@mantine/core";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import classes from './NavigationBar.module.css';

export default function NavigationBar() {
    const router = useRouter();

    return (
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
            </Group>
        </div>
    )
}
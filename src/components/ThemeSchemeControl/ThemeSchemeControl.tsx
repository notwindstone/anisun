"use client";

import {ActionIcon, MantineColor, useComputedColorScheme, useMantineColorScheme} from "@mantine/core";
import {IconSun, IconMoon} from "@tabler/icons-react";
import cx from 'clsx';
import classes from "./ThemeSchemeControl.module.css";
import {HEX} from "@/types/HEX/HEX";

export default function ThemeSchemeControl({ color }: { color?: MantineColor | HEX }) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <>
            <ActionIcon
                color={color}
                onClick={() => {
                    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
                }}
                variant="light"
                size="lg"
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </>
    );
}
"use client"

import {ActionIcon, useComputedColorScheme, useMantineColorScheme} from "@mantine/core";
import {IconSun, IconMoon} from "@tabler/icons-react";
import cx from 'clsx';
import classes from "./ThemeSchemeControl.module.css";
import {useContext} from "react";
import {CustomThemeContext} from "@/utils/Contexts/Contexts";

export default function ThemeSchemeControl() {
    const { theme } = useContext(CustomThemeContext);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <>
            <ActionIcon
                color={theme.color}
                onClick={() => {
                    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
                }}
                variant="light"
                size="lg"
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </>
    )
}
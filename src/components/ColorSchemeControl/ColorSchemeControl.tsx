import {ActionIcon, HoverCard, useComputedColorScheme, useMantineColorScheme} from "@mantine/core";
import {IconPalette, IconSun, IconMoon} from "@tabler/icons-react";
import cx from 'clsx';
import classes from "./ColorSchemeControl.module.css";

export default function ColorSchemeControl() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <>
            <HoverCard zIndex={30001}>
                <HoverCard.Target>
                    <IconPalette />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <ActionIcon
                        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        variant="default"
                        size="xl"
                        aria-label="Toggle color scheme"
                    >
                        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                    </ActionIcon>
                </HoverCard.Dropdown>
            </HoverCard>
        </>
    )
}
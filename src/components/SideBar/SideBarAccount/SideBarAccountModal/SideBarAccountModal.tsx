import {Button, Flex, rem, Transition} from "@mantine/core";
import React from "react";
import classes from './SideBarAccountModal.module.css';
import {useLocalStorage} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";

export default function SideBarAccountModal({
    children,
    mounted,
    func,
}: {
    children: React.ReactNode;
    mounted: boolean;
    func: () => void;
}) {
    const [theme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
    })

    return (
        <Transition
            mounted={mounted}
            transition="fade-down"
            duration={400}
            timingFunction="ease"
        >
            {
                (styles) => (
                    <Flex style={styles} gap={rem(32)} align="center" direction="column" className={classes.modal}>
                        <Button
                            color={theme.color}
                            className={classes.closeButton}
                            onClick={func}
                        >
                            Закрыть
                        </Button>
                        {children}
                    </Flex>
                )
            }
        </Transition>
    )
}
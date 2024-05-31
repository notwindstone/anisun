import {Button, Flex, rem, Transition} from "@mantine/core";
import React from "react";
import classes from './AccountModal.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";

export default function AccountModal({
    children,
    mounted,
    func,
}: {
    children: React.ReactNode;
    mounted: boolean;
    func: () => void;
}) {
    const { theme } = useCustomTheme();

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
                            autoContrast
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
    );
}
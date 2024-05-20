import {Button, Flex, rem, Transition} from "@mantine/core";
import React from "react";
import classes from './SideBarAccountModal.module.css';

export default function SideBarAccountModal({
    children,
    mounted,
    func,
}: {
    children: React.ReactNode;
    mounted: boolean;
    func: () => void;
}) {
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
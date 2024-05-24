import React from "react";
import {Group, rem, Transition} from "@mantine/core";

export default function SideBarItemExpanded({
    children,
    mounted,
}: {
    children: React.ReactNode;
    mounted: boolean;
}) {
    return (
        <Transition
            mounted={mounted}
            transition="fade-right"
            duration={150}
            timingFunction="ease"
        >
            {
                (styles) =>
                    <Group
                        flex={1}
                        style={styles}
                        pr={rem(8)}
                        wrap="nowrap"
                        justify="space-between"
                        align="center"
                    >
                        {children}
                    </Group>
            }
        </Transition>
    );
}
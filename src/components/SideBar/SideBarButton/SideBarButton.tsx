import React, {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import {Group, rem, Text, Tooltip, UnstyledButton} from "@mantine/core";
import {useHover} from "@mantine/hooks";
import useRipple from "use-ripple-hook";
import {usePathname, useRouter} from "next/navigation";
import NProgress from "nprogress";
import classes from "./SideBarButton.module.css";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";

export default function SideBarButton({
    icon,
    label,
    redirectLink,
} : {
    icon: React.ReactNode;
    label: string;
    redirectLink?: string;
}) {
    const [ripple, event] = useRipple();
    const router = useRouter();
    const pathname = usePathname();
    const { opened } = useContext(
        SideBarContext
    );
    const { hovered, ref } = useHover();

    function redirect() {
        if (redirectLink !== undefined) {
            NProgress.start();
            router.push(redirectLink);
        }

        if (pathname === redirectLink) {
            return NProgress.done();
        }
    }

    return (
        <Tooltip
            position="right"
            transitionProps={{ transition: 'fade-right' }}
            ref={ref}
            label={label}
            opened={hovered && !opened}
        >
            <UnstyledButton
                ref={ripple}
                onPointerDown={event}
                className={`
                    ${classes.button}
                    ${pathname === redirectLink && classes.activeButton}
                `}
                w={opened ? rem(288) : rem(64)}
                h={rem(64)}
                p={rem(8)}
                onClick={redirect}
            >
                <Group wrap="nowrap">
                    <Group
                        className={classes.iconWrapper}
                        wrap="nowrap"
                        w={rem(48)}
                        h={rem(48)}
                        justify="center"
                        align="center"
                    >
                        {icon}
                    </Group>
                    <SideBarItemExpanded mounted={opened}>
                        <Text size="lg" inline>
                            {label}
                        </Text>
                    </SideBarItemExpanded>
                </Group>
            </UnstyledButton>
        </Tooltip>
    );
}
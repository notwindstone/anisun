import React, {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Box, Group, Popover, rem, Stack, Text, Tooltip, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IconChevronRight, IconUserCircle} from "@tabler/icons-react";
import classes from './SideBarAccountTarget.module.css';
import useRipple from "use-ripple-hook";
import {variables} from "@/configs/variables";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";
import {useHover} from "@mantine/hooks";
import {useTranslations} from "next-intl";

export default function SideBarAccountTarget() {
    const translate = useTranslations('Translations');
    const accountPlaceholder = translate('account-placeholder');
    const { user } = useUser();
    const { expanded, setExpanded } = useContext(
        SideBarPopoverContext
    );
    const { opened } = useContext(
        SideBarContext
    );
    const [ripple, event] = useRipple({
        duration: 700,
        ...variables.rippleColor
    });
    const { hovered, ref } = useHover();

    function toggleDropdown() {
        setExpanded((expanded) => !expanded);
    }

    return (
        <Popover.Target>
            <Tooltip
                position="right"
                transitionProps={{ transition: 'fade-right' }}
                ref={ref}
                label={accountPlaceholder}
                opened={hovered && !opened && !expanded}
            >
                <UnstyledButton
                    ref={ripple}
                    onPointerDown={event}
                    className={classes.button}
                    w={opened ? rem(288) : rem(64)}
                    h={rem(64)}
                    p={rem(16)}
                    onClick={toggleDropdown}
                >
                    <Group wrap="nowrap">
                        <SignedIn>
                            <Avatar
                                className={classes.avatar}
                                src={user?.imageUrl ?? '/blurred.png'}
                                size={rem(32)}
                                alt={`Аватар пользователя ${user?.username}`}
                            >
                                {user?.username?.[0]}
                            </Avatar>
                        </SignedIn>
                        <SignedOut>
                            <Box
                                w={rem(32)}
                                h={rem(32)}
                            >
                                <IconUserCircle size={32} stroke={1.5} />
                            </Box>
                        </SignedOut>
                        <SideBarItemExpanded mounted={opened}>
                            <Stack gap={0}>
                                <Text
                                    size="lg"
                                    inline
                                >
                                    {user?.username ?? accountPlaceholder}
                                </Text>
                            </Stack>
                            <IconChevronRight
                                className={
                                    `${classes.chevron} ${expanded && classes.chevronRotated}`
                                }
                                size={24}
                                stroke={1.5}
                            />
                        </SideBarItemExpanded>
                    </Group>
                </UnstyledButton>
            </Tooltip>
        </Popover.Target>
    );
}
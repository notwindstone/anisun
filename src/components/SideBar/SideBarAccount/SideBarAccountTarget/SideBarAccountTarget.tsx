import React, {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Box, Group, Popover, rem, Stack, Text, Transition, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IconChevronRight, IconUserCircle} from "@tabler/icons-react";
import classes from './SideBarAccountTarget.module.css';
import useRipple from "use-ripple-hook";
import {variables} from "@/configs/variables";

function ExpandedInfo({
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
    )
}

export default function SideBarAccountTarget() {
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

    function toggleDropdown() {
        setExpanded((expanded) => !expanded)
    }

    return (
        <Popover.Target>
            <UnstyledButton
                ref={ripple}
                onPointerDown={event}
                className={classes.button}
                w={opened ? rem(288) : rem(64)}
                h={rem(64)}
                p={rem(8)}
                onClick={toggleDropdown}
            >
                <Group wrap="nowrap">
                    <SignedIn>
                        <Avatar
                            className={classes.avatar}
                            src={user?.imageUrl ?? '/blurred.png'}
                            size={rem(48)}
                            alt={`Аватар пользователя ${user?.username}`}
                        >
                            {user?.username?.[0]}
                        </Avatar>
                    </SignedIn>
                    <SignedOut>
                        <Box
                            w={rem(48)}
                            h={rem(48)}
                        >
                            <IconUserCircle size={48} stroke={1.5} />
                        </Box>
                    </SignedOut>
                    <ExpandedInfo mounted={opened}>
                        {
                            user?.username ? (
                                <Stack gap={0} h={48}>
                                    <Text className={classes.username} fw={500} size="lg">
                                        {user.username}
                                    </Text>
                                    <Text size="sm">
                                        Настройки
                                    </Text>
                                </Stack>
                            ) : (
                                <></>
                            )
                        }
                        <IconChevronRight
                            className={
                                `${classes.chevron} ${expanded && classes.chevronRotated}`
                            }
                            size={24}
                            stroke={1.5}
                        />
                    </ExpandedInfo>
                </Group>
            </UnstyledButton>
        </Popover.Target>
    )
}
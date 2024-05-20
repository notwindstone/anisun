import React, {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Box, Group, Popover, rem, Text, Transition, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IconChevronRight, IconUserCircle} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import classes from './SideBarAccountTarget.module.css';

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
                    <Group style={styles} pr={rem(16)} wrap="nowrap" w="100%" justify="space-between" align="center">
                        {children}
                    </Group>
            }
        </Transition>
    )
}

export default function SideBarAccountTarget() {
    const { user } = useUser();
    const { setExpanded } = useContext(
        SideBarPopoverContext
    );
    const { opened } = useContext(
        SideBarContext
    );

    function toggleDropdown() {
        setExpanded((expanded) => !expanded)
    }

    return (
        <Popover.Target>
            <Box
                w={opened ? rem(320) : rem(64)}
                h={rem(64)}
                p={rem(8)}
            >
                <SignedIn>
                    <Avatar
                        className={classes.avatar}
                        src={user?.imageUrl ?? '/blurred.png'}
                        size={rem(48)}
                        alt={`Аватар пользователя ${user?.username}`}
                        onClick={toggleDropdown}
                    >
                        {user?.username?.[0]}
                    </Avatar>
                </SignedIn>
                <SignedOut>
                    <UnstyledButton
                        w={rem(48)}
                        h={rem(48)}
                        onClick={toggleDropdown}
                    >
                        <IconUserCircle size={48} stroke={1.5} />
                    </UnstyledButton>
                </SignedOut>
                <ExpandedInfo mounted={opened}>
                    <Text fw={500} size="lg">
                        Аккаунт
                    </Text>
                    <IconChevronRight
                        className={
                            `${classes.chevron} ${opened && classes.chevronRotated}`
                        }
                        size={24}
                        stroke={1.5}
                    />
                </ExpandedInfo>
            </Box>
        </Popover.Target>
    )
}
import {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Box, Popover, rem, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IconUserCircle} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import classes from './SideBarAccountTarget.module.css';

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
                w={rem(64)}
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
                        w={rem(32)}
                        h={rem(32)}
                        onClick={toggleDropdown}
                    >
                        <IconUserCircle {...variables.iconProps} />
                    </UnstyledButton>
                </SignedOut>
            </Box>
        </Popover.Target>
    )
}
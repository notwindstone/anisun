import {useContext} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Box, Popover, rem, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IconUserCircle} from "@tabler/icons-react";
import {variables} from "@/configs/variables";

export default function SideBarAccountTarget() {
    const { user } = useUser();
    const { setExpanded } = useContext(
        SideBarPopoverContext
    );

    function toggleDropdown() {
        setExpanded((expanded) => !expanded)
    }

    return (
        <Popover.Target>
            <Box
                w={rem(64)}
                h={rem(64)}
                p={rem(16)}
            >
                <SignedIn>
                    <Avatar
                        src={user?.imageUrl}
                        size={rem(32)}
                        onClick={toggleDropdown}
                    >
                        w
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
import {useContext} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {Avatar, Popover} from "@mantine/core";

export default function SideBarAccountTarget() {
    const { setExpanded } = useContext(
        SideBarPopoverContext
    );

    return (
        <Popover.Target>
            <Avatar onClick={() => setExpanded((o) => !o)}>w</Avatar>
        </Popover.Target>
    )
}
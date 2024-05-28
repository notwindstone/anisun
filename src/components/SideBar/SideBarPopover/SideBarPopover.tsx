import classes from "@/components/SideBar/SideBarAccount/SideBarAccount.module.css";
import {Popover} from "@mantine/core";
import React, {useContext} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";

export default function SideBarPopover({ children }: { children: React.ReactNode }) {
    const { expanded, setExpanded } = useContext(
        SideBarPopoverContext
    );

    return (
        <Popover
            classNames={{
                dropdown: classes.dropdown,
            }}
            opened={expanded}
            onChange={setExpanded}
            position="right"
            transitionProps={{ transition: 'fade-right', duration: 150 }}
        >
            {children}
        </Popover>
    );
}
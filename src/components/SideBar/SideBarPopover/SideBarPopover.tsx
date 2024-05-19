import {Popover} from "@mantine/core";
import classes from './SideBarPopover.module.css';
import React from "react";

export default function SideBarPopover({
    button,
    dropdown
}: {
    button: React.ReactNode,
    dropdown: React.ReactNode
}) {


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
            <Popover.Target>
                {button}
            </Popover.Target>
            <Popover.Dropdown>
                {dropdown}
            </Popover.Dropdown>
        </Popover>
    )
}
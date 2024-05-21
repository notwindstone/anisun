import React, {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import {Tooltip} from "@mantine/core";
import {useHover} from "@mantine/hooks";

export default function SideBarButton({
    children,
    label
} : {
    children: React.ReactNode;
    label: string;
}) {
    const { opened } = useContext(
        SideBarContext
    );
    const { hovered, ref } = useHover();

    return (
        <Tooltip
            color="dark"
            position="right"
            transitionProps={{ transition: 'fade-right' }}
            ref={ref}
            label={label}
            opened={hovered && !opened}
        >
            {children}
        </Tooltip>
    )
}
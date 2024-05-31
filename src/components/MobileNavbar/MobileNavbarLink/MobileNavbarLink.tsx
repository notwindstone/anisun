import React from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import {NavLink, ThemeIcon} from "@mantine/core";
import classes
    from "./MobileNavbarLink.module.css";

export default function MobileNavbarLink({
    func,
    label,
    children
}: {
    func: () => void;
    label: string;
    children: React.ReactNode;
}) {
    const { theme } = useCustomTheme();

    return (
        <NavLink
            h={64}
            classNames={{
                root: classes.root,
                label: classes.label
            }}
            onClick={func}
            label={label}
            leftSection={
                <ThemeIcon
                    size={48}
                    color={theme?.color}
                    radius="md"
                    variant="light"
                >
                    {children}
                </ThemeIcon>
            }
        />
    );
}
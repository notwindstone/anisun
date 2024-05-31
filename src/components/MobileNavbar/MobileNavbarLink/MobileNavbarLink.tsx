import React from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import {NavLink, ThemeIcon} from "@mantine/core";
import classes
    from "@/components/MobileNavbar/MobileNavbarMenu/MobileNavbarMenuAccount/MobileNavbarMenuAccount.module.css";

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
            className={classes.navLink}
            onClick={func}
            label={label}
            leftSection={
                <ThemeIcon
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
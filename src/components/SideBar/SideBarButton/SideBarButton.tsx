import {Tooltip, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {SideBarLink} from "@/types/SideBarLink";
import {useContext} from "react";
import {SideBarLinkContext} from "@/components/SideBar/SideBar";

export default function SideBarButton({ link, order }: { link: SideBarLink, order: number }) {
    const { active, setActive } = useContext(SideBarLinkContext)
    const isActive = active === order

    return (
        <>
            <Tooltip
                color="gray"
                withArrow
                position="right"
                label={link.label}
                transitionProps={{ transition: 'fade-right' }}
            >
                <UnstyledButton
                    className={
                        `${classes.button} ${isActive && classes.activeButton}`
                    }
                    onClick={() => setActive(order)}
                >
                    {
                        isActive
                            ? link.activeIcon
                            : link.icon
                    }
                </UnstyledButton>
            </Tooltip>
        </>
    )
}
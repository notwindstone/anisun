import {Tooltip, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {SideBarLink} from "@/types/SideBarLink";
import {useContext} from "react";
import {SideBarLinkContext} from "@/components/SideBar/SideBar";

export default function SideBarButton({ link, index }: { link: SideBarLink, index: number }) {
    const { active, setActive } = useContext(SideBarLinkContext)
    const isActive = active === index

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
                    onClick={() => setActive(index)}
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
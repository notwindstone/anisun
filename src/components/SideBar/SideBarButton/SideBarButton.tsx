import {Center, Text, Tooltip, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {SideBarLink} from "@/types/SideBarLink";
import {useContext} from "react";
import {SideBarLinkContext} from "@/components/SideBar/SideBar";

export default function SideBarButton({ link, order }: { link: SideBarLink, order: number }) {
    const { active, setActive, opened } = useContext(SideBarLinkContext)
    const isActive = active === order

    return (
        <>
            <Tooltip
                color="gray"
                position="right"
                label={link.label}
                transitionProps={{ transition: 'fade-right' }}
            >
                <UnstyledButton
                    className={
                        `
                            ${classes.button} 
                            ${isActive && classes.activeButton}
                            ${opened && classes.expandedButton}
                        `
                    }
                    onClick={() => setActive(order)}
                >
                    <Center className={classes.iconWrapper} w={64} h={64}>
                        {
                            isActive
                                ? link.activeIcon
                                : link.icon
                        }
                    </Center>
                    {
                        opened && (
                            <Text>{link.label}</Text>
                        )
                    }
                </UnstyledButton>
            </Tooltip>
        </>
    )
}
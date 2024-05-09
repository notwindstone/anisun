import {Center, Group, Popover, rem, Text, Tooltip, Transition, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {SideBarLink} from "@/types/SideBarLink";
import {useContext, useState} from "react";
import {SideBarLinkContext} from "@/components/SideBar/SideBar";
import {IconChevronRight} from "@tabler/icons-react";

export default function SideBarButton({ link, order }: { link: SideBarLink, order: number }) {
    const { active, setActive, opened } = useContext(SideBarLinkContext)
    const [expanded, setExpanded] = useState(false);
    const isActive = active === order
    const isPopover = link.content !== undefined

    const button = (
        <UnstyledButton
            className={
                `
                    ${classes.button} 
                    ${isActive && classes.activeButton}
                    ${opened && classes.expandedButton}
                `
            }
            onClick={() => {
                setExpanded(!expanded)
                setActive(order)
            }}
        >
            <Center className={classes.iconWrapper} w={64} h={64}>
                {
                    isActive
                        ? link.activeIcon
                        : link.icon
                }
            </Center>
            <Transition
                mounted={opened}
                transition="fade-right"
                duration={150}
                timingFunction="ease"
            >
                {
                    (styles) =>
                        <Group pr={rem(16)} wrap="nowrap" w="100%" justify="space-between" align="center">
                            <Text fw={500} size="lg" style={styles}>
                                {link.label}
                            </Text>
                            {
                                isPopover && (
                                    <IconChevronRight
                                        className={
                                            `${classes.chevron} ${expanded && classes.chevronRotated}`
                                        }
                                        size={24}
                                        stroke={1.5}
                                        style={styles}
                                    />
                                )
                            }
                        </Group>
                }
            </Transition>
        </UnstyledButton>
    )

    return isPopover ? (
        <>
            <Popover
                opened={expanded}
                onChange={setExpanded}
                width={200}
                position="right"
                transitionProps={{ transition: 'fade-right', duration: 150 }}
            >
                <Popover.Target>
                    {button}
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
                </Popover.Dropdown>
            </Popover>
        </>
    ) : (
        <>
            <Tooltip
                color="gray"
                position="right"
                label={link.label}
                transitionProps={{ transition: 'fade-right' }}
            >
                {button}
            </Tooltip>
        </>
    )
}
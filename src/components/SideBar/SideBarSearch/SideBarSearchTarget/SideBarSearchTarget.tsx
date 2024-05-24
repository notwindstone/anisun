import {Group, Popover, rem, Text, Tooltip, UnstyledButton} from "@mantine/core";
import classes from "./SideBarSearchTarget.module.css";
import {IconChevronRight, IconSearch} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";
import {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import useRipple from "use-ripple-hook";
import {useHover} from "@mantine/hooks";

const LABEL = "Поиск";

export default function SideBarSearchTarget() {
    const { expanded, setExpanded } = useContext(
        SideBarPopoverContext
    );
    const { opened } = useContext(
        SideBarContext
    );
    const [ripple, event] = useRipple({
        duration: 700,
        ...variables.rippleColor
    });
    const { hovered, ref } = useHover();

    function toggleDropdown() {
        setExpanded((expanded) => !expanded);
    }

    return (
        <Popover.Target>
            <Tooltip
                position="right"
                transitionProps={{ transition: 'fade-right' }}
                ref={ref}
                label={LABEL}
                opened={hovered && !opened && !expanded}
            >
                <UnstyledButton
                    ref={ripple}
                    onPointerDown={event}
                    className={classes.button}
                    w={opened ? rem(288) : rem(64)}
                    h={rem(64)}
                    p={rem(8)}
                    onClick={toggleDropdown}
                >
                    <Group wrap="nowrap">
                        <Group
                            className={classes.iconWrapper}
                            wrap="nowrap"
                            w={rem(48)}
                            h={rem(48)}
                            justify="center"
                            align="center"
                        >
                            <IconSearch {...variables.iconProps} />
                        </Group>
                        <SideBarItemExpanded mounted={opened}>
                            <Text size="lg" inline>
                                {LABEL}
                            </Text>
                            <IconChevronRight
                                className={
                                    `${classes.chevron} ${expanded && classes.chevronRotated}`
                                }
                                size={24}
                                stroke={1.5}
                            />
                        </SideBarItemExpanded>
                    </Group>
                </UnstyledButton>
            </Tooltip>
        </Popover.Target>
    );
}
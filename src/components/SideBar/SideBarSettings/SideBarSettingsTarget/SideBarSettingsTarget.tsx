import classes from './SideBarSettingsTarget.module.css';
import {Box, Group, Popover, rem, Text, UnstyledButton} from "@mantine/core";
import {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import useRipple from "use-ripple-hook";
import {variables} from "@/configs/variables";
import {IconChevronRight, IconSettings} from "@tabler/icons-react";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";

export default function SideBarSettingsTarget() {
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

    function toggleDropdown() {
        setExpanded((expanded) => !expanded)
    }

    return (
        <Popover.Target>
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
                        <IconSettings {...variables.iconProps} />
                    </Group>
                    <SideBarItemExpanded mounted={opened}>
                        <Text size="lg" inline>
                            Настройки
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
        </Popover.Target>
    )
}
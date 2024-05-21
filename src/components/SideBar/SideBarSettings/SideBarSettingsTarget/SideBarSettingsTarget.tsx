import classes from './SideBarSettingsTarget.module.css';
import {Popover, rem, UnstyledButton} from "@mantine/core";
import {useContext} from "react";
import {SideBarContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import useRipple from "use-ripple-hook";
import {variables} from "@/configs/variables";

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
                1234
            </UnstyledButton>
        </Popover.Target>
    )
}
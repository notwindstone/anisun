import {Group, Popover, rem, SegmentedControl} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function SideBarSearchDropdown() {
    const { theme } = useCustomTheme();

    return (
        <Popover.Dropdown>
            <Group
                w={rem(428)}
                wrap="nowrap"
                p={rem(8)}
                align="flex-start"
                gap={rem(16)}
            >
                12344
            </Group>
        </Popover.Dropdown>
    )
}
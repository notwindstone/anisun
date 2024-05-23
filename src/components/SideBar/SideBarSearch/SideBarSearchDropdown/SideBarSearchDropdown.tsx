import {Group, Popover, rem, SegmentedControl} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import SearchBar from "@/components/SearchBar/SearchBar";

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
                grow
            >
                <SearchBar />
            </Group>
        </Popover.Dropdown>
    )
}
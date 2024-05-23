import {Group, Popover, rem, SegmentedControl, Stack, Title} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function SideBarSearchDropdown() {
    const { theme } = useCustomTheme();

    return (
        <Popover.Dropdown>
            <Stack
                p={rem(8)}
            >
                <Title>
                    Поиск
                </Title>
                <Group
                    w={rem(428)}
                    wrap="nowrap"
                    align="flex-start"
                    gap={rem(16)}
                    grow
                >
                    <SearchBar />
                </Group>
            </Stack>
        </Popover.Dropdown>
    )
}
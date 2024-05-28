import {Button, Popover, rem, Stack, Title} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import {IconAdjustmentsHorizontal} from "@tabler/icons-react";

export default function SideBarSearchDropdown() {
    const { theme } = useCustomTheme();

    return (
        <Popover.Dropdown>
            <Stack
                w={rem(428)}
                p={rem(8)}
            >
                <Title>
                    Поиск
                </Title>
                <SearchBar size="md" />
                <Button
                    component={Link}
                    href="/titles"
                    variant="light"
                    color={theme.color}
                    leftSection={<IconAdjustmentsHorizontal />}
                >
                    Перейти к фильтрам
                </Button>
            </Stack>
        </Popover.Dropdown>
    );
}
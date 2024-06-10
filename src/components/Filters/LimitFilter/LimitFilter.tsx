import {rem, Slider, Stack, Text} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {Dispatch, memo, SetStateAction} from "react";

export default memo(function LimitFilter({
    limit,
    setLimit
}: {
    limit: number,
    setLimit: Dispatch<SetStateAction<number>>
}) {
    const { theme } = useCustomTheme();

    return (
        <Stack gap={rem(4)}>
            <Text size="sm">
                Лимит
            </Text>
            <Slider
                pb={rem(24)}
                value={limit}
                onChange={setLimit}
                marks={[
                    { value: 10, label: '10' },
                    { value: 20, label: '20' },
                    { value: 30, label: '30' },
                    { value: 40, label: '40' },
                    { value: 50, label: '50' },
                ]}
                color={theme.color}
                min={1}
                max={50}
            />
        </Stack>
    );
});
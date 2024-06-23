import useCustomTheme from "@/hooks/useCustomTheme";
import {Dispatch, memo, SetStateAction} from "react";
import {rem, Slider, Stack, Text} from "@mantine/core";
import {useTranslations} from "next-intl";

export default memo(function ScoreFilter({
    score,
    setScore
}: {
    score: number,
    setScore: Dispatch<SetStateAction<number>>
}) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();

    return (
        <Stack gap={rem(4)}>
            <Text size="sm">
                {translate('component__score-filter__score-label')}
            </Text>
            <Slider
                pb={rem(24)}
                inverted
                value={score}
                onChange={setScore}
                marks={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                    { value: 9, label: '9' },
                    { value: 10, label: '10' },
                ]}
                color={theme.color}
                min={1}
                max={10}
            />
        </Stack>
    );
});
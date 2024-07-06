import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import classes from '@/components/Filters/FiltersSelect.module.css';
import {useDisclosure} from "@mantine/hooks";
import calculateColor from "@/utils/Misc/calculateColor";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useTranslations} from "next-intl";

export default memo(function DurationFilter({
    durations,
    setDurations
}: {
    durations: string[],
    setDurations: Dispatch<SetStateAction<string[]>>
}) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);

    return (
        <MultiSelect
            onDropdownOpen={open}
            onDropdownClose={close}
            styles={{
                input: {
                    borderColor: focused ? color : undefined
                }
            }}
            classNames={classes}
            placeholder={translate('component__duration-filter__episodes-duration-label')}
            value={durations}
            onChange={setDurations}
            data={[
                {
                    label: translate('component__duration-filter__duration-less-than-ten-minutes-label'),
                    value: "S"
                },
                {
                    label: translate('component__duration-filter__duration-ten-to-thirty-minutes-label'),
                    value: "D"
                },
                {
                    label: translate('component__duration-filter__duration-more-than-thirty-minutes-label'),
                    value: "F"
                },
            ]}
        />
    );
});
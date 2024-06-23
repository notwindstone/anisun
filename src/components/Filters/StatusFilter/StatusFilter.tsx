import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';
import calculateColor from "@/utils/Misc/calculateColor";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";
import {useTranslations} from "next-intl";

export default memo(function StatusFilter({
    statuses, 
    setStatuses
}: {
    statuses: string[],
    setStatuses: Dispatch<SetStateAction<string[]>>
}) {
    const translate = useTranslations('Translations');
    const statusesArray = Object.values(variables.sorting);
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);
    const statusesData = statusesArray.map((status) => {
        return {
            label: translate(status.label),
            value: status.value
        };
    });

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
            placeholder={translate('component__status-filter__status-label')}
            value={statuses}
            onChange={setStatuses}
            data={statusesData}
        />
    );
});
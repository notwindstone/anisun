import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';
import calculateColor from "@/utils/Misc/calculateColor";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";

export default memo(function StatusFilter({
    statuses, 
    setStatuses
}: {
    statuses: string[],
    setStatuses: Dispatch<SetStateAction<string[]>>
}) {
    const statusesArray = Object.values(variables.sorting);
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
            placeholder="Статус"
            value={statuses}
            onChange={setStatuses}
            data={statusesArray}
        />
    );
});
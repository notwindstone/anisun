import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import classes from '@/components/Filters/FiltersSelect.module.css';
import {useDisclosure} from "@mantine/hooks";
import calculateColor from "@/utils/Misc/calculateColor";
import useCustomTheme from "@/hooks/useCustomTheme";

export default memo(function DurationFilter({
    durations,
    setDurations
}: {
    durations: string[],
    setDurations: Dispatch<SetStateAction<string[]>>
}) {
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
            placeholder="Длительность эпизодов"
            value={durations}
            onChange={setDurations}
            data={[
                { label: "Меньше 10 минут", value: "S" },
                { label: "10 - 30 минут", value: "D" },
                { label: "Больше 30 минут", value: "F" },
            ]}
        />
    );
});
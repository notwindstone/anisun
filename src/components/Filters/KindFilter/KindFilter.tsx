import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";
import calculateColor from "@/utils/Misc/calculateColor";

export default memo(function KindFilter({
    kinds,
    setKinds
}: {
    kinds: string[],
    setKinds: Dispatch<SetStateAction<string[]>>
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
            placeholder="Тип"
            value={kinds}
            onChange={setKinds}
            data={variables.filters.kind}
        />
    );
});
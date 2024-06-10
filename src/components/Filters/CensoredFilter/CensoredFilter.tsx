import {Switch} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {memo} from "react";
import classes from '@/components/Filters/FiltersSwitch.module.css';

export default memo(function CensoredFilter({
    censored,
    toggleCensored
}: {
    censored: boolean,
    toggleCensored: () => void
}) {
    const { theme } = useCustomTheme();

    return (
        <>
            <Switch
                classNames={classes}
                label="Включить цензуру"
                color={theme.color}
                checked={censored}
                onChange={toggleCensored}
            />
        </>
    );
});
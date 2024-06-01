import {Switch} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useContext} from "react";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function CensoredFilter() {
    const { theme } = useCustomTheme();
    const { censored, toggleCensored } = useContext(AdvancedSearchFiltersContext);

    return (
        <>
            <Switch
                label="Включить цензуру"
                color={theme.color}
                checked={censored}
                onChange={toggleCensored}
            />
        </>
    );
}
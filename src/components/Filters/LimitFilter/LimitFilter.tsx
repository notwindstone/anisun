import {Slider} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useContext} from "react";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function LimitFilter() {
    const { theme } = useCustomTheme();
    const { limit, setLimit } = useContext(AdvancedSearchFiltersContext);

    return (
        <Slider
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
    );
}
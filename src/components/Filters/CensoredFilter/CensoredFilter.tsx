import {Switch} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function CensoredFilter({
    censored,
    toggleCensored
}: {
    censored: boolean;
    toggleCensored: () => void;
}) {
    const { theme } = useCustomTheme();
    console.log("test");
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
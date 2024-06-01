import {Switch} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";

export default function CensoredFilter() {
    const { theme } = useCustomTheme();
    const [censored, { toggle }] = useDisclosure(false);

    return (
        <>
            <Switch
                label="Включить цензуру"
                color={theme.color}
                checked={censored}
                onChange={toggle}
            />
        </>
    );
}
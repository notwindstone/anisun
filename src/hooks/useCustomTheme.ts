import {useLocalStorage} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";

export default function useCustomTheme() {
    const [theme, setTheme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            topLoaderColor: defaultTheme.topLoaderColor,
            breadcrumb: true
        },
    })

    return { theme, setTheme };
}
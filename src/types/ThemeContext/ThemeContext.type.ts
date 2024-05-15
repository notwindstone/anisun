import {MantineColor} from "@mantine/core";

export type ThemeContextType = {
    theme: {
        color?: MantineColor;
        breadcrumb?: boolean;
    };
    setTheme: ({ color, breadcrumb }: { color: MantineColor, breadcrumb: boolean }) => void;
}
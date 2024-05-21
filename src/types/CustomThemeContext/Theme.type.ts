import {MantineColor} from "@mantine/core";
import {HEX} from "@/types/HEX/HEX";

export type ThemeType = {
    color?: MantineColor | HEX;
    topLoaderColor?: MantineColor | HEX;
    breadcrumb?: boolean;
}
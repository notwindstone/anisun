import {MantineColor} from "@mantine/core";
import {HEXType} from "@/types/HEX/HEX.type";

export type ThemeType = {
    color?: MantineColor | HEXType;
    topLoaderColor?: MantineColor | HEXType;
    breadcrumb?: boolean;
};
import {variables} from "@/configs/variables";
import {MantineColor} from "@mantine/core";
import {HEXType} from "@/types/HEX/HEX.type";

export default function calculateColor(color: MantineColor | HEXType | undefined) {
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    return isMantineColor ? mantineColor : color;
}
import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import { StepsType } from "@/types/TailwindCSS/Steps.type";

export default function getTailwindColor({
    color,
    step,
}: {
    color: PaletteType;
    step: StepsType;
}): `theme("colors.${PaletteType}.${StepsType}")` {
    return `theme("colors.${color}.${step}")`;
}
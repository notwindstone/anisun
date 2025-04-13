import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import { StepsType } from "@/types/TailwindCSS/Steps.type";

export default function getTailwindColor({
    color,
    step,
}: {
    color: PaletteType;
    step: StepsType;
}): `var(--color-${PaletteType}-${StepsType})` {
    return `var(--color-${color}-${step})`;
}
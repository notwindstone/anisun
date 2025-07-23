import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import { StepsType } from "@/types/TailwindCSS/Steps.type";
import getSafeTailwindColors from "@/lib/appearance/getSafeTailwindColors";

export default function parseTailwindColor({
    color,
    step,
}: {
    color: PaletteType;
    step: StepsType;
}): string {
    const colors = getSafeTailwindColors();

    return colors[color][step];
}

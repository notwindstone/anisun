import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import { StepsType } from "@/types/TailwindCSS/Steps.type";
import colors from 'tailwindcss/colors';

export default function parseTailwindColor({
    color,
    step,
}: {
    color: PaletteType;
    step: StepsType;
}): string {
    return colors[color][step];
}

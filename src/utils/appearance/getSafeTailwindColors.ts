/**
 * Since the version 4.x, tailwind uses `oklch` colors.
 * They are not supported in the most browsers from... 2022 lol
 * why tf 2022 was 3 years ago
 */
import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import { StepsType } from "@/types/TailwindCSS/Steps.type";
import colors from "tailwindcss/colors";

export default function getSafeTailwindColors(): Record<PaletteType, Record<StepsType, string>> {
    // initialize as `true` so that there will be no strange behaviour in new browsers during SSR
    let supportsNewColors: boolean = true;

    // check for support only during CSR
    if (typeof CSS !== "undefined") {
        supportsNewColors = CSS.supports("color", "oklch(0 0 0)");
    }

    if (!supportsNewColors) {

    }

    return colors;
}

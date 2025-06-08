import { PaletteType } from "@/types/TailwindCSS/Palette.type";

export type BaseColorsType = Extract<PaletteType,
    "slate" | "gray" | "zinc" | "neutral" | "stone"
>;
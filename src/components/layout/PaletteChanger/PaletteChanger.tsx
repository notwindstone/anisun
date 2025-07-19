"use client";

import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import Button from "@/components/base/Button/Button";
import { Check } from "lucide-react";
import { useContextSelector } from "use-context-selector";

function changePalette({
    currentConfig,
    color,
    propertyKey,
}: {
    currentConfig: SafeConfigType;
    color: BaseColorsType | AccentColorsType;
    propertyKey: "base" | "accent";
}) {
    const newData: SafeConfigType = {
        ...currentConfig,
    };

    switch (propertyKey) {
        case "accent": {
            for (const accentColor of AccentColors) {
                if (accentColor === color) {
                    newData.colors.accent = color;
                }
            }

            break;
        }
        case "base": {
            for (const baseColor of BaseColors) {
                if (baseColor === color) {
                    newData.colors.base = color;
                }
            }

            break;
        }
    }

    setConfigValuesClient({ configs: newData });
}

export default function PaletteChanger({
    colors,
    propertyKey,
}: {
    colors: Array<BaseColorsType | AccentColorsType>;
    propertyKey: "base" | "accent";
}) {
    const { config, optimisticallyUpdate, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            config:               value.data,
            optimisticallyUpdate: value.optimisticallyUpdate,
            dictionaries:         value.dictionaries,
        };
    });

    function switchColor(color: PaletteType) {
        optimisticallyUpdate?.((state) => {
            return {
                ...state,
                colors: {
                    ...state?.colors,
                    accent: propertyKey === "accent"
                        ? color
                        : state?.colors?.accent,
                    base: propertyKey === "base"
                        ? color
                        : state?.colors?.base,
                },
            };
        });

        changePalette({
            currentConfig: config,
            color,
            propertyKey,
        });
    }

    return (
        <>
            {
                colors.map((color) => (
                    <Button
                        custom={{
                            appendClassNames: "w-10 h-10 rounded-md",
                        }}
                        style={{
                            background: parseTailwindColor({
                                color,
                                step: 600,
                            }),
                        }}
                        key={color}
                        onClick={() => switchColor(color)}
                        label={`${dictionaries?.aria?.changePaletteColor} "${dictionaries?.appearance?.[color]}"`}
                        title={dictionaries?.appearance?.[color] as string}
                    >
                        {
                            [
                                config.colors.accent,
                                config.colors.base,
                            ].includes(color) && (
                                <Check />
                            )
                        }
                    </Button>
                ))
            }
        </>
    );
}

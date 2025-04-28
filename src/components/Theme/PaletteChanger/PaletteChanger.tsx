"use client";

import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import Button from "@/components/Button/Button";

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
    const { data: config, optimisticallyUpdate } = useContext(ConfigsContext);

    function switchColor(color: PaletteType) {
        optimisticallyUpdate?.((state) => {
            return {
                ...state,
                colors: {
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
            <div>
                {
                    colors.map((color) => (
                        <Button
                            custom={{
                                appendClassNames: "w-32",
                            }}
                            key={color}
                            onClick={() => switchColor(color)}
                            label={`Set palette color to ${color}`}
                        >
                            <div
                                className="w-6 h-6 rounded-full"
                                style={{
                                    background: parseTailwindColor({
                                        color,
                                        step: 500,
                                    }),
                                }}
                            />
                            {color}
                        </Button>
                    ))
                }
            </div>
        </>
    );
}
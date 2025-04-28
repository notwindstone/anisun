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
import { Check } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";

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
    const { data: config, optimisticallyUpdate, dictionaries } = useContext(ConfigsContext);
    const router = useRouter();
    const loader = useTopLoader();

    function switchColor(color: PaletteType) {
        loader.start();
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
        router.refresh();
        loader.done();
    }

    return (
        <>
            <div className="flex flex-col gap-2">
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
            </div>
        </>
    );
}
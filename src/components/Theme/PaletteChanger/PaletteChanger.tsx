"use client";

import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import setConfigValues from "@/utils/configs/setConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { useContext, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import {AccentColors, BaseColors} from "@/constants/tailwind";

async function changePalette({
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
    
    await setConfigValues({ configs: newData });
}

export default function PaletteChanger({
    colors,
    propertyKey,
}: {
    colors: Array<BaseColorsType | AccentColorsType>;
    propertyKey: "base" | "accent";
}) {
    const [pending, setPending] = useState(false);
    const { data } = useContext(ConfigsContext);
    const config = getSafeConfigValues({ config: data });

    return (
        <>
            <div>
                {
                    colors.map((color) => (
                        <div key={color} onClick={async () => {
                            if (pending) {
                                return;
                            }

                            setPending(true);

                            await changePalette({
                                currentConfig: config,
                                color,
                                propertyKey,
                            });

                            setPending(false);
                        }}>
                            {color}
                        </div>
                    ))
                }
            </div>
        </>
    );
}
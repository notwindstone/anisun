import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

const placeholderArray = [ "w-9", "w-14", "w-14" ];

export default function SkeletonHeroCard({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    return (
        <div
            className="w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2 sm:w-[75%] sm:justify-center sm:items-start sm:max-w-320 sm:mx-auto sm:gap-4"
        >
            <div className="flex flex-wrap justify-center gap-2">
                {
                    placeholderArray.map((widthClassName, index) => {
                        return (
                            <div
                                className={`animate-pulse rounded-md h-[22px] sm:h-[28px] ${widthClassName}`}
                                key={`${widthClassName}_${index}`}
                                style={{
                                    backgroundColor: parseTailwindColor({
                                        color: base,
                                        step:  theme === DarkThemeKey
                                            ? 800
                                            : 200,
                                    }),
                                }}
                            />
                        );
                    })
                }
            </div>
            <div
                className="animate-pulse rounded-md w-96 max-w-[60%] h-8 sm:h-10"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 800
                            : 200,
                    }),
                }}
            />
            <div
                className="hidden sm:block animate-pulse rounded-md w-[100%] h-[56px]"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 800
                            : 200,
                    }),
                }}
            />
        </div>
    );
}
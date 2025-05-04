import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

const placeholderArray = [ "w-18", "w-8" ];
const placeholderNamesArray = [ "w-28", "w-20" ];

export default function SkeletonSmallCard({
    theme,
    base,
    isGrid,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
    isGrid?: boolean;
}) {
    const gridClassNames = isGrid ? "w-full flex-max-w-1/2 xs:flex-max-w-1/3 lg:flex-max-w-1/4 xl:flex-max-w-1/6" : "";

    return (
        <>
            <div className={`shrink-0 relative aspect-poster rounded-md overflow-clip ${gridClassNames}`}>
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 gap-2">
                    <div className="flex flex-wrap justify-between gap-1 w-full">
                        {
                            placeholderArray.map((widthClassName, index) => {
                                return (
                                    <div
                                        className={`animate-pulse rounded-md h-5 ${widthClassName}`}
                                        key={`${widthClassName}_${index}`}
                                        style={{
                                            backgroundColor: parseTailwindColor({
                                                color: base,
                                                step: theme === DarkThemeKey
                                                    ? 800
                                                    : 200,
                                            }),
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            placeholderNamesArray.map((widthClassName, index) => {
                                return (
                                    <div
                                        key={`${widthClassName}_${index}`}
                                        className={`rounded-md ${widthClassName} animate-pulse h-5`}
                                        style={{
                                            backgroundColor: parseTailwindColor({
                                                color: base,
                                                step: theme === DarkThemeKey
                                                    ? 800
                                                    : 200,
                                            }),
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
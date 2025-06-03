"use client";

import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Button from "@/components/base/Button/Button";
import { useRouter } from "nextjs-toploader/app";
import { usePathname, useSearchParams } from "next/navigation";

export default function SkeletonPlayer({
    status = "uncached",
}: {
    status?: "cached" | "uncached" | undefined;
}) {
    const { translations, colors, theme } = useContextSelector(ConfigsContext, (value) => ({
        translations: value.dictionaries?.player,
        colors:       value.data.colors,
        theme:        value.data.theme,
    }));
    const searchParameters = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function replaceState(status: "cached" | "uncached") {
        const parameters = new URLSearchParams(searchParameters);

        parameters.set("status", status);

        replace(`${pathname}?${parameters.toString()}`);
    }

    return (
        <>
            <div
                className="flex flex-col gap-4 items-center justify-center aspect-video w-full animate-pulse"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: colors.base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 200,
                    }),
                }}
            >
                <p className="leading-none text-xl sm:text-4xl font-semibold">
                    {translations?.[status]?.title}
                </p>
                <p className="leading-none opacity-60 text-sm sm:text-lg">
                    {translations?.[status]?.description}
                </p>
                {
                    status === "uncached" && (
                        <Button
                            onClick={() => replaceState("cached")}
                            custom={{ style: "base" }}
                            label={translations?.selectCached as string}
                        >
                            {translations?.selectCached}
                        </Button>
                    )
                }
            </div>
        </>
    );
}

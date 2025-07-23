import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

export default function ExtensionSkeleton({
    title,
    description,
    shouldPulse,
    children,
}: {
    title: string;
    description: string;
    shouldPulse?: boolean;
    children?: React.ReactNode;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:  value.data.colors.base,
            theme: value.data.theme,
        };
    });

    return (
        <div
            className={`flex flex-col gap-4 items-center justify-center h-full w-full ${shouldPulse ? "animate-pulse" : ""}`}
            style={{
                backgroundColor: parseTailwindColor({
                    color: base,
                    step:  theme === DarkThemeKey
                        ? 800
                        : 200,
                }),
            }}
        >
            <p className="leading-none text-xl sm:text-4xl font-semibold">
                {title}
            </p>
            <p className="leading-none opacity-60 text-sm sm:text-lg px-2 text-center text-balance">
                {description}
            </p>
            {children}
        </div>
    );
}

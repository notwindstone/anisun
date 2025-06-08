import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";

export default function ExtensionsBrowser() {
    const { base, theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);

    return (
        <div className="flex">
            {JSON.stringify(extensions)}
            {accent}
            <div
                className="transition p-4 rounded-md flex flex-col gap-4 w-full"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey ? 900 : 100,
                    }),
                }}
            >
                <div className="flex justify-between">
                    <p className="leading-none text-lg font-medium">
                        Extension Repository
                    </p>
                    <div className="flex gap-2">
                        <p className="leading-none text-lg font-medium">
                            Filter by...
                        </p>
                        <p className="leading-none text-lg font-medium">
                            Search
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { DarkThemeKey } from "@/constants/configs";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { ConfigType } from "@/types/Configs/Config.type";

export default function Wrapper({
    configs,
    children,
}: {
    configs: ConfigType;
    children: React.ReactNode;
}) {
    const { theme } = getSafeConfigValues({ config: configs });

    return (
        <div style={{
            backgroundColor: theme === DarkThemeKey
                ? "var(--color-zinc-950)"
                : "var(--color-white)",
        }}>
            {children}
        </div>
    );
}
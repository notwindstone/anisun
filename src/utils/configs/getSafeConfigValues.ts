import { ConfigType } from "@/types/Configs/Config.type";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { InitialConfig } from "@/constants/configs";

export default function getSafeConfigValues({
    config,
}: {
    config: ConfigType;
}): SafeConfigType {
    return {
        theme: config?.theme ?? InitialConfig.theme,
        colors: {
            accent: config?.colors?.accent ?? InitialConfig.colors.accent,
            topLoader: config?.colors?.topLoader ?? InitialConfig.colors.topLoader,
        },
    };
}
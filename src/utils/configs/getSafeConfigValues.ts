import { ConfigType, SafeConfigType } from "@/types/Configs/Config.type";
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
        },
    };
}
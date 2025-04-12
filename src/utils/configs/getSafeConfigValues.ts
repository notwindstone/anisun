import { ConfigType, SafeConfigType } from "@/types/Configs/Config.type";

export default function getSafeConfigValues({
    config,
}: {
    config: ConfigType;
}): SafeConfigType {
    return {
        theme: "",
        colors: {
            accent: "",
        },
    };
}
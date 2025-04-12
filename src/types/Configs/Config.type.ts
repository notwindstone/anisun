import { DeepRequired } from "@/types/Utils/DeepRequired.type";

export type ConfigType = {
    theme?: string;
    colors?: {
        accent?: string;
    };
} | undefined;

export type SafeConfigType = DeepRequired<NonNullable<ConfigType>>;
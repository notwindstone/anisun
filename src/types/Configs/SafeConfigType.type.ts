import { DeepRequired } from "@/types/Utils/DeepRequired.type";
import { ConfigType } from "@/types/Configs/Config.type";

export type SafeConfigType = DeepRequired<NonNullable<ConfigType>>;
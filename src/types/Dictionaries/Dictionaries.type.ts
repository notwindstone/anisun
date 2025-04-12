import { getDictionary } from "@/get-dictionary";

export type DictionariesType = Awaited<ReturnType<typeof getDictionary>> | undefined;
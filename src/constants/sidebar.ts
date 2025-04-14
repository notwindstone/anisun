import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export const getSideBarLinks = (dictionaries: DictionariesType) => [
    {
        name: dictionaries?.server,
    },
    {
        name: "",
    },
];
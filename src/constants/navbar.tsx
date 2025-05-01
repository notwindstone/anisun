import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { CircleUser, House, Search } from "lucide-react";

export const getNavbarItems = (dictionaries: DictionariesType): Array<{
    name: string | undefined;
    href: string;
    icon: React.ReactNode;
}> => [
    {
        name: dictionaries?.sidebar?.home,
        href: PageRoutes.Root,
        icon: <House className="shrink-0" size={24} />,
    },
    {
        name: dictionaries?.sidebar?.search,
        href: PageRoutes.Search.Root,
        icon: <Search className="shrink-0" size={24} />,
    },
    {
        name: dictionaries?.sidebar?.account,
        href: PageRoutes.Settings.Root,
        icon: <CircleUser className="shrink-0" size={24} />,
    },
];
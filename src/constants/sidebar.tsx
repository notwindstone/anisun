import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { History, House, Library } from "lucide-react";

export const getSideBarLinks = (dictionaries: DictionariesType): Array<{
    title: string;
    links: Array<{
        name: string | undefined;
        href: string;
        icon: React.ReactNode;
    }>;
}> => [
    {
        title: "main",
        links: [
            {
                name: dictionaries?.sidebar?.home,
                href: PageRoutes.Root,
                icon: <House className="shrink-0" size={24} />,
            },
            {
                name: dictionaries?.sidebar?.library,
                href: PageRoutes.Library.Root,
                icon: <Library className="shrink-0" size={24} />,
            },
            {
                name: dictionaries?.sidebar?.history,
                href: PageRoutes.History.Root,
                icon: <History className="shrink-0" size={24} />,
            },
        ],
    },
    {
        title: "other",
        links: [],
    },
];
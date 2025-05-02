import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { CircleUser, House, Search } from "lucide-react";
import Image from "next/image";

export const getNavbarItems = ({
    dictionaries,
    avatar,
}: {
    dictionaries: DictionariesType;
    avatar: string | undefined;
}): Array<{
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
        href: PageRoutes.Account.Root,
        icon: avatar
            ? <Image
                className="rounded-full"
                width={24}
                height={24}
                src={avatar}
                alt={"User avatar"}
            />
            : <CircleUser className="shrink-0" size={24} />,
    },
];
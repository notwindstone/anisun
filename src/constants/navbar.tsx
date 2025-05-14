import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { CircleUser, House, Search } from "lucide-react";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";

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
            ? <ConfiguredImage
                className="rounded-full transition duration-200"
                width={24}
                height={24}
                src={avatar}
                alt={"User avatar"}
                unoptimized={true}
            />
            : <CircleUser className="shrink-0" size={24} />,
    },
];
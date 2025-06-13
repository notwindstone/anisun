import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import {Blocks, CircleUser, House, Library} from "lucide-react";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";

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
        icon: <House className="shrink-0 w-5 h-5 xxs:w-6 xxs:h-6" size={24} />,
    },
    {
        name: dictionaries?.sidebar?.library,
        href: PageRoutes.Library.Root,
        icon: <Library className="shrink-0 w-5 h-5 xxs:w-6 xxs:h-6" size={24} />,
    },
    {
        name: dictionaries?.sidebar?.extensions,
        href: PageRoutes.Extensions.Root,
        icon: <Blocks className="shrink-0 w-5 h-5 xxs:w-6 xxs:h-6" size={24} />,
    },
    {
        name: dictionaries?.sidebar?.account,
        href: PageRoutes.Account.Root,
        icon: avatar
            ? <ConfiguredImage
                className="rounded-full transition duration-200 w-5 h-5 xxs:w-6 xxs:h-6"
                width={24}
                height={24}
                src={avatar}
                alt={"User avatar"}
                unoptimized={true}
            />
            : <CircleUser className="shrink-0 w-5 h-5 xxs:w-6 xxs:h-6" size={24} />,
    },
];

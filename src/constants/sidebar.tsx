import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { CircleUser, History, Hourglass, House, Library, Settings } from "lucide-react";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";

export const getSideBarLinks = ({
    dictionaries,
    avatar,
}: {
    dictionaries: DictionariesType;
    avatar: string | undefined;
}): Array<{
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
            {
                name: dictionaries?.sidebar?.watchLater,
                href: PageRoutes.WatchLater.Root,
                icon: <Hourglass className="shrink-0" size={24} />,
            },
        ],
    },
    {
        title: "other",
        links: [

            {
                name: dictionaries?.sidebar?.settings,
                href: PageRoutes.Settings.Root,
                icon: <Settings className="shrink-0" size={24} />,
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
        ],
    },
];
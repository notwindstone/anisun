import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PageRoutes } from "@/constants/routes";
import { Blocks, CircleUser, House, Library, ShieldAlert } from "lucide-react";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { DefaultUsername } from "@/constants/app";

const iconSize = 20;

export const getSideBarLinks = ({
    dictionaries,
    avatar,
    username,
}: {
    dictionaries: DictionariesType;
    avatar: string | undefined;
    username: string | undefined;
}): Array<{
    title: string;
    links: Array<{
        name: string | undefined;
        href: string;
        icon: React.ReactNode;
        hidden?: boolean | undefined;
    }>;
}> => [
    {
        title: "Main",
        links: [
            {
                name: dictionaries?.sidebar?.home,
                href: PageRoutes.Root,
                icon: <House className="shrink-0" size={iconSize} />,
            },
            {
                name: dictionaries?.sidebar?.library,
                href: PageRoutes.Library.Root,
                icon: <Library className="shrink-0" size={iconSize} />,
            },
            {
                name: dictionaries?.sidebar?.extensions,
                href: PageRoutes.Extensions.Root,
                icon: <Blocks className="shrink-0" size={iconSize} />,
            },
            // check if user is "admin" (or is pretending to be)
            // ofc works only for one person (me)
            {
                name:   "admin",
                href:   PageRoutes.Admin.Root,
                icon:   <ShieldAlert className="shrink-0" size={iconSize} />,
                hidden: username !== DefaultUsername,
            },
        ],
    },
    {
        title: "Other",
        links: [
            {
                name: dictionaries?.sidebar?.account,
                href: PageRoutes.Account.Root,
                icon: avatar
                    ? <ConfiguredImage
                        className="rounded-full transition duration-200"
                        width={iconSize}
                        height={iconSize}
                        src={avatar}
                        alt={"User avatar"}
                        unoptimized={true}
                    />
                    : <CircleUser className="shrink-0" size={iconSize} />,
            },
        ],
    },
];

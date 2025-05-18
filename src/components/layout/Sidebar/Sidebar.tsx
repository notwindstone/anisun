import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { getSideBarLinks } from "@/constants/sidebar";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import Link from "next/link";

export default function Sidebar({
    config,
    dictionaries,
    accountInfo,
}: {
    config: SafeConfigType;
    dictionaries: DictionariesType;
    accountInfo: unknown;
}) {
    let avatar: string | undefined;

    if (
        typeof accountInfo === "object"
        && accountInfo !== null
        && "avatar" in accountInfo
        && typeof accountInfo.avatar === "string"
    ) {
        avatar = accountInfo.avatar;
    }

    const sidebarItems = getSideBarLinks({
        dictionaries,
        avatar,
    });

    return (
        <div className="flex flex-col gap-2 w-full">
            {
                sidebarItems.map(({ title, links }) => {
                    return (
                        <div key={title} className="flex flex-col gap-2 w-full">
                            {
                                links.map((link) => {
                                    return (
                                        <Link
                                            // `null` by default, which means only static routes gonna fully prefetch
                                            // `true` allows for the full dynamic route prefetch
                                            prefetch
                                            href={link.href}
                                            key={link.href}
                                            className="hover:bg-[#0001] transition-colors flex flex-nowrap items-center overflow-clip w-full p-2 rounded-md"
                                            aria-label={link.name}
                                            title={link.name}
                                        >
                                            <div className="flex justify-center items-center w-6 shrink-0">
                                                {link.icon}
                                            </div>
                                            <p className="pl-2 line-clamp-1">
                                                {link.name}
                                            </p>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}
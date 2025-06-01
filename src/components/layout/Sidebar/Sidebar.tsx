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
    // these values update only on server-side refetch
    // so we can't track sidebar `expanded` value
    // because it updates on the client-side
    // but a `position` is updated using a POST query to the server
    const { layout: { sidebar: { position } } } = config;

    let avatar: string | undefined;
    let username: string | undefined;

    if (
        typeof accountInfo === "object"
        && accountInfo !== null
        && "avatar" in accountInfo
        && typeof accountInfo.avatar === "string"
    ) {
        avatar = accountInfo.avatar;
    }

    if (
        typeof accountInfo === "object"
        && accountInfo !== null
        && "username" in accountInfo
        && typeof accountInfo.username === "string"
    ) {
        username = accountInfo.username;
    }

    const sidebarItems = getSideBarLinks({
        dictionaries,
        avatar,
        username,
    });

    return (
        <div className="flex flex-col gap-2 w-full">
            {
                sidebarItems.map(({ title, links }) => {
                    return (
                        <div key={title} className="flex flex-col gap-2 w-full">
                            {
                                links.map((link) => {
                                    if (link.hidden) {
                                        return;
                                    }

                                    return (
                                        <Link
                                            // `null` by default, which means only static routes gonna fully prefetch
                                            // `true` allows for the full dynamic route prefetch
                                            prefetch
                                            href={link.href}
                                            key={link.href}
                                            className="dark:hover:bg-[#fff1] hover:bg-[#0001] transition-colors flex flex-nowrap items-center overflow-hidden w-full p-2 rounded-md"
                                            aria-label={link.name}
                                            title={link.name}
                                            style={{
                                                flexDirection: position === "right"
                                                    ? "row-reverse"
                                                    : "row",
                                            }}
                                        >
                                            <div className="flex justify-center items-center w-6 shrink-0">
                                                {link.icon}
                                            </div>
                                            <p className="line-clamp-1">
                                                <span className="px-1" />
                                                {link.name}
                                                <span className="px-1" />
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

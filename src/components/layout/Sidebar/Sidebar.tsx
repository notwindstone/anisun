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
        <>
            {
                sidebarItems.map(({ title, links }) => {
                    return (
                        <div key={title}>
                            <p className="">
                                {title}
                            </p>
                            <div>
                                {
                                    links.map((link) => {
                                        return (
                                            <Link
                                                href={link.href}
                                                key={link.href}
                                                className=""
                                            >
                                                {link.icon}
                                                <p>
                                                    {link.name}
                                                </p>
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
            {JSON.stringify(config)}
        </>
    );
}
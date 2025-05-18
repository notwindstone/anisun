import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { getSideBarLinks } from "@/constants/sidebar";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import Link from "next/link";

export default function Sidebar({
    config,
    dictionaries,
}: {
    config: SafeConfigType;
    dictionaries: DictionariesType;
}) {
    const sidebarItems = getSideBarLinks(dictionaries);

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
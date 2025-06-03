import { AppName, getFooterItems } from "@/constants/app";
import Favicon from "@/components/base/Favicon/Favicon";
import Link from "next/link";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import Badge from "@/components/base/Badge/Badge";

export default function Footer({
    dictionaries,
}: {
    dictionaries: DictionariesType;
}) {
    const footerItems = getFooterItems(dictionaries);
    const currentGitCommitHash = process.env.GIT_COMMIT_HASH;
    console.log(currentGitCommitHash);

    return (
        <>
            <div className="p-4 flex flex-col lg:justify-between lg:flex-row gap-4 mx-auto max-w-384 sm:py-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-nowrap gap-4">
                        <Favicon />
                        <div className="flex flex-col gap-1 justify-center">
                            <div className="text-xl font-medium leading-none flex items-center gap-2">
                                {AppName}{
                                    currentGitCommitHash !== undefined && (
                                        <Badge textSize="text-xs">
                                            <a
                                                className="hover:opacity-75 transition"
                                                href={`https://github.com/notwindstone/anisun/tree/${currentGitCommitHash}`}
                                                target="_blank"
                                            >
                                                {currentGitCommitHash}
                                            </a>
                                        </Badge>
                                    )
                                }
                            </div>
                            <Link href="/" className="text-sm leading-none text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">
                                anime.tatar
                            </Link>
                        </div>
                    </div>
                    <div className="text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap">
                        {footerItems.description}{' '}<a href="mailto:copyrights@anime.tatar" className="transition text-neutral-800 dark:text-neutral-200 hover:underline">copyrights@anime.tatar</a>
                    </div>
                </div>
                <div className="flex gap-2 flex-nowrap items-start w-full lg:w-fit lg:min-w-[25%]">
                    {
                        footerItems.columns.map((column) => {
                            return (
                                <div key={column.title} className="flex-1 shrink-0 flex flex-col gap-2">
                                    <p className="text-md">
                                        {column.title}
                                    </p>
                                    {
                                        column.links?.map((link) => {
                                            return (
                                                <a
                                                    className="text-sm w-fit text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                                                    href={link.url}
                                                    target="_blank"
                                                    key={link.name}
                                                >
                                                    {link.name}
                                                </a>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

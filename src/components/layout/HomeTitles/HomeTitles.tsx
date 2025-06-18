import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import SkeletonHeroCard from "@/components/misc/SkeletonHeroCard/SkeletonHeroCard";
import SearchedAnimes from "@/components/search/SearchedAnimes/SearchedAnimes";
import { HomePageItems } from "@/constants/translated";
import Cards from "@/components/misc/Cards/Cards";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { Locale } from "@/i18n-config";
import ErrorHeroCard from "@/components/misc/ErrorHeroCard/ErrorHeroCard";

export default function HomeTitles({
    lang,
    theme,
    base,
    data,
    status,
}: {
    lang:    Locale;
    theme:   "dark" | "light";
    base:    BaseColorsType;
    data?:   Awaited<ReturnType<typeof getGraphQLResponse>> | undefined;
    status?: "pending" | "error";
}) {
    if (status === "pending") {
        return (
            <>
                <div className="flex flex-col gap-4">
                    <div className="relative overflow-clip w-full h-full aspect-video sm:aspect-auto sm:h-128">
                        <SkeletonHeroCard theme={theme} base={base} />
                    </div>
                </div>
                <div className="w-full h-4" />
                <SearchedAnimes />
                <div className="w-full h-4" />
                {
                    HomePageItems.map((item) => {
                        return (
                            <div key={item.title.en} className="flex flex-col gap-4 mx-auto max-w-384">
                                <div />
                                <p className="text-2xl font-medium leading-none px-4">
                                    {item.title[lang]}
                                </p>
                                <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none px-4">
                                    {item.description[lang]}
                                </p>
                                <Cards isPending />
                            </div>
                        );
                    })
                }
            </>
        );
    }

    if (status === "error") {
        return (
            <>
                <div className="flex flex-col gap-4">
                    <div className="relative overflow-clip w-full h-full aspect-video sm:aspect-auto sm:h-128">
                        <ErrorHeroCard />
                    </div>
                </div>
                <div className="w-full h-4" />
                <SearchedAnimes />
                <div className="w-full h-4" />
                {
                    HomePageItems.map((item) => {
                        return (
                            <div key={item.title.en} className="flex flex-col gap-4 mx-auto max-w-384">
                                <div />
                                <p className="text-2xl font-medium leading-none px-4">
                                    {item.title[lang]}
                                </p>
                                <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none px-4">
                                    {item.description[lang]}
                                </p>
                                <Cards isError />
                            </div>
                        );
                    })
                }
            </>
        );
    }

    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}

import { Suspense } from "react";
import SkeletonHeroCard from "@/components/misc/SkeletonHeroCard/SkeletonHeroCard";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AnimeType } from "@/types/Anime/Anime.type";
import HeroCard from "@/components/misc/HeroCard/HeroCard";
import ErrorHeroCard from "@/components/misc/ErrorHeroCard/ErrorHeroCard";
import ServerFetch from "@/components/fetch/ServerFetch/ServerFetch";

export default function Hero({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="relative overflow-clip w-full h-full aspect-video">
                    <Suspense fallback={
                        <SkeletonHeroCard theme={theme} base={base} />
                    }>
                        <ServerFetch
                            renderChildrenWithData={
                                ({
                                    data,
                                }: {
                                    data?: AnimeType | Array<AnimeType>;
                                }) => (
                                    <HeroCard data={data} />
                                )
                            }
                            queryKey={["hero", "anime"]}
                            method={"FetchHeroTitle"}
                            pendingUI={
                                <SkeletonHeroCard theme={theme} base={base} />
                            }
                            errorUI={
                                <ErrorHeroCard />
                            }
                            cacheErrorKey={"hero/error"}
                            cacheQueryKey={"hero/anime"}
                            dataIsArray={false}
                        >
                            <HeroCard />
                        </ServerFetch>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
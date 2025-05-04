import { Suspense } from "react";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AnimeType } from "@/types/Anime/Anime.type";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import ErrorCard from "@/components/Hero/ErrorCard/ErrorCard";
import ServerFetch from "@/components/ServerFetch/ServerFetch";

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
                        <SkeletonCard theme={theme} base={base} />
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
                                <SkeletonCard theme={theme} base={base} />
                            }
                            errorUI={
                                <ErrorCard />
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
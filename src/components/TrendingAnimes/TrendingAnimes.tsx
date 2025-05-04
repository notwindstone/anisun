import { Suspense } from "react";
import Cards from "@/components/Cards/Cards";
import ServerFetch from "@/components/ServerFetch/ServerFetch";
import { AnimeType } from "@/types/Anime/Anime.type";

export default function TrendingAnimes() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div />
                <p className="text-2xl font-medium leading-none px-4">
                    Trending Now
                </p>
                <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none px-4">
                    Explore currently popular anime titles
                </p>
                <Suspense fallback={
                    <Cards isPending />
                }>
                    <ServerFetch
                        renderChildrenWithData={
                            ({
                                data,
                            }: {
                                data?: AnimeType | Array<AnimeType>;
                            }) => (
                                <Cards data={data} />
                            )
                        }
                        queryKey={["trending", "anime"]}
                        method={"FetchTrendingTitles"}
                        pendingUI={
                            <Cards isPending />
                        }
                        errorUI={
                            <Cards isError />
                        }
                        cacheErrorKey={"trending/anime"}
                        cacheQueryKey={"trending/error"}
                        dataIsArray
                    >
                        <Cards />
                    </ServerFetch>
                </Suspense>
            </div>
        </>
    );
}
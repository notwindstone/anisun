import { Suspense } from "react";
import Cards from "@/components/misc/Cards/Cards";
import ServerFetch from "@/components/fetch/ServerFetch/ServerFetch";
import { AnimeType } from "@/types/Anime/Anime.type";
import { Getters } from "@/lib/anime/getters";

export default function ListAnimes({
    title,
    description,
    method,
    queryKey,
}: {
    title: string;
    description: string;
    method: keyof typeof Getters;
    queryKey: string;
}) {
    const cacheQueryKey = `${queryKey}/anime`;
    const cacheErrorKey = `${queryKey}/error`;

    return (
        <>
            <div className="flex flex-col gap-4 mx-auto max-w-384">
                <div />
                <p className="text-2xl font-medium leading-none px-4">
                    {title}
                </p>
                <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none px-4">
                    {description}
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
                        queryKey={[queryKey, "anime"]}
                        method={method}
                        pendingUI={
                            <Cards isPending />
                        }
                        errorUI={
                            <Cards isError />
                        }
                        cacheErrorKey={cacheErrorKey}
                        cacheQueryKey={cacheQueryKey}
                        dataIsArray
                    >
                        <Cards />
                    </ServerFetch>
                </Suspense>
            </div>
        </>
    );
}
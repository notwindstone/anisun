"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AnilibriaSearchContext } from "@/utils/providers/AnilibriaSearchProvider";
import Button from "@/components/base/Button/Button";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export default function AnilibriaFetch() {
    const searchParameters = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { search } = useContext(AnilibriaSearchContext);
    const { isPending, error, data } = useQuery({
        queryKey: ["anime", "anilibria", search],
        queryFn: async () => {
            if (!search) {
                return [];
            }

            const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${search}&limit=8`);
            const data = await response.json();

            return data.list;
        },
    });

    if (isPending) {
        return <>loading</>;
    }

    console.log(data);
    if (error) {
        return <>error</>;
    }

    function handleMediaSelect(url: string) {
        const parameters = new URLSearchParams(searchParameters);
        parameters.set("mediaSrc", url);
        replace(`${pathname}?${parameters.toString()}`);
    }

    return (
        <>
            {
                // TODO lol this is a mess
                // eslint-disable-next-line unicorn/no-abusive-eslint-disable
                // eslint-disable-next-line
                // @ts-ignore
                data.map((anime) => {
                    return (
                        <div key={anime.id}>
                            <div>
                                {anime.names.ru}
                            </div>
                            <Button
                                onClick={() => handleMediaSelect(
                                    `https://cache.libria.fun${anime.player.list?.["1"].hls.fhd}`,
                                )}
                                label={anime.names.en}
                            >
                                go
                            </Button>
                        </div>
                    );
                })
            }
        </>
    );
}
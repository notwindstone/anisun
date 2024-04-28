"use client"

import {Image} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";

export default function AnimeInfo({ shikimoriId }: { shikimoriId: string }) {
    const shikimori = client();
    const { data, isFetching } = useQuery({
        queryKey: ['animeInfo', shikimoriId],
        queryFn: async () => getAnime(shikimoriId),
    });

    async function getAnime(id: string) {
        return (await shikimori.animes.list({
            ids: id,
            limit: 1
        })).animes
    }

    console.log(isFetching, data)

    return (
        <>
            <Image
                alt="Anime poster"
                src={"https://desu.shikimori.one/uploads/poster/animes/5114/40c4cba552dc60ebf02f8fc373b9a503.jpeg"}
                placeholder="blur"
                blurDataURL={globalVariables.imagePlaceholder}
                width={700}
                height={990}
                component={NextImage}
            />
        </>
    )
}
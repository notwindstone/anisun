"use client";

import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { useQuery } from "@tanstack/react-query";

export default function HeroCardImage({
    image,
    name,
    idMal,
}: {
    image: string | undefined;
    name: string;
    idMal: number | undefined;
}) {
    // anilist provides low quality anime posters
    // so we fetch high-res images from shikimori
    const { data, status } = useQuery({
        queryKey: ["anime", "hero", "image", idMal],
        queryFn:  async () => {
            const data = await fetch("https://shikimori.one/api/graphql", {
                method:  "POST",
                headers: {
                    "content-type": "application/json",
                    "User-Agent":   "anime.tatar",
                },
                body: JSON.stringify({
                    query: `
                        {
                          animes(ids: "${idMal}") {
                            poster { id originalUrl mainUrl }
                          }
                        }
                    `,
                }),
            });

            const body = await data.json();

            return body?.data?.animes?.[0]?.poster?.originalUrl;
        },
    });

    const shouldBlur = status === "success" ? "" : "sm:blur-md";
    const imageSource = status === "success" ? data : image;

    return (
        <ConfiguredImage
            priority
            className={`hero__poster-image object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75 sm:brightness-50 sm:scale-110 sm:group-hover:brightness-50 sm:group-hover:scale-115 ${shouldBlur}`}
            style={{
                objectPosition: "100% 20%",
            }}
            fill
            src={imageSource}
            alt={`${name} anime's poster`}
            unoptimized={status === "success"}
            sizes={"(max-width: 640px) 256px, 144px"}
        />
    );
}

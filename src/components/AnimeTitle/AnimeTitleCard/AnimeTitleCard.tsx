import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType"
import {Image} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from '@/configs/globalVariables.json';

export default function AnimeTitleCard({ anime }: { anime: AnimeType }) {
    const poster = anime.poster?.originalUrl ?? '/missing-image.png'

    return (
        <>
            <Image
                alt={`Постер к ${anime.name}`}
                src={poster}
                component={NextImage}
                width={600}
                height={600}
                placeholder="blur"
                blurDataURL={globalVariables.imagePlaceholder}
            />
        </>
    )
}
import { AnimeType } from "@/types/Anime/Anime.type";

export default function SmallCard({
    data,
}: {
    data: AnimeType;
}) {
    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}
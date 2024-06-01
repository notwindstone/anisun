import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {client} from "@/lib/shikimori/client";

export default function AdvancedSearchFilters() {
    const shikimori = client();
    const router = useRouter();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    async function getGenres() {
        return await shikimori
            .genres
            .all({
                entryType: "Anime"
            });
    }
    console.log(data);
    function selectGenre(genre: string | null) {
        router.push("/titles?genre=" + genre);
    }

    return (
        <>
            <Select
                onChange={(genre) => selectGenre(genre)}
                radius="md"
                placeholder="Жанр"
                data={[
                    '1',
                    '2',
                    '3',
                    '4'
                ]}
            />
        </>
    );
}
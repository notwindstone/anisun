import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {client} from "@/lib/shikimori/client";
import {useEffect, useState} from "react";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";
import {AdvancedSearchFiltersType} from "@/types/AdvancedSearch/AdvancedSearchFilters.type";

export default function AdvancedSearchFilters() {
    const [selectData, setSelectData] = useState<AdvancedSearchFiltersType[] | undefined>();
    const shikimori = client();
    const router = useRouter();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    async function getGenres() {
        return (await shikimori
            .genres
            .all({
                entryType: "Anime"
            })).genres;
    }
    console.log(data);
    function selectGenre(genre: string | null) {
        router.push("/titles?genre=" + genre);
    }

    useEffect(() => {
        if (!data) {
            return;
        }

        const demographicGenres: AdvancedSearchFiltersType
            = { group: 'demographic', items: [] };
        const genreGenres: AdvancedSearchFiltersType
            = { group: 'genre', items: [] };
        const themeGenres: AdvancedSearchFiltersType
            = { group: 'theme', items: [] };

        data.forEach((genre: GenreType) => {
            switch (genre.kind) {
                case "demographic":
                    return demographicGenres.items.push({
                        label: genre.russian,
                        value: genre.id,
                    });
                case "genre":
                    return genreGenres.items.push({
                        label: genre.russian,
                        value: genre.id,
                    });
                case "theme":
                    return themeGenres.items.push({
                        label: genre.russian,
                        value: genre.id,
                    });
            }
        });

        return setSelectData([
            demographicGenres,
            genreGenres,
            themeGenres,
        ]);
    }, [data]);

    return (
        <>
            <Select
                onChange={(genre) => selectGenre(genre)}
                radius="md"
                placeholder="Жанр"
                data={selectData}
            />
        </>
    );
}
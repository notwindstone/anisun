import {MultiSelect} from "@mantine/core";
import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {AdvancedSearchFiltersType} from "@/types/AdvancedSearch/AdvancedSearchFilters.type";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";

export default function GenreFilter() {
    const [demographicGenresData, setDemographicGenres] = useState<AdvancedSearchFiltersType>();
    const [genreGenresData, setGenreGenres] = useState<AdvancedSearchFiltersType>();
    const [themeGenresData, setThemeGenres] = useState<AdvancedSearchFiltersType>();
    const router = useRouter();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    async function getGenres() {
        return (await shikimori
            .genres
            .all({
                entryType: "Anime"
                // @ts-ignore
            })).genres;
    }

    function selectGenre(genres: string[] | null) {
        router.push("/titles?genre=" + genres);
    }

    useEffect(() => {
        if (!data) {
            return;
        }

        const demographicGenres: AdvancedSearchFiltersType = [];
        const genreGenres: AdvancedSearchFiltersType = [];
        const themeGenres: AdvancedSearchFiltersType = [];

        data.forEach((genre: GenreType) => {
            switch (genre.kind) {
                case "demographic":
                    return demographicGenres.push({
                        label: genre.russian,
                        value: genre.id,
                    });
                case "genre":
                    return genreGenres.push({
                        label: genre.russian,
                        value: genre.id,
                    });
                case "theme":
                    return themeGenres.push({
                        label: genre.russian,
                        value: genre.id,
                    });
            }
        });

        setDemographicGenres(demographicGenres);
        setGenreGenres(genreGenres);
        setThemeGenres(themeGenres);
    }, [data]);

    console.log(data, isPending, error);

    return (
        <>
            <MultiSelect
                onChange={(genres) => selectGenre(genres)}
                radius="md"
                placeholder="Аудитория"
                data={demographicGenresData}
            />
            <MultiSelect
                onChange={(genres) => selectGenre(genres)}
                radius="md"
                placeholder="Жанры"
                data={genreGenresData}
            />
            <MultiSelect
                onChange={(genres) => selectGenre(genres)}
                radius="md"
                placeholder="Темы"
                data={themeGenresData}
            />
        </>
    );
}
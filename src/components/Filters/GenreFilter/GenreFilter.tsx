import {MultiSelect, Skeleton} from "@mantine/core";
import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {AdvancedSearchFiltersType} from "@/types/AdvancedSearch/AdvancedSearchFilters.type";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";

export default function GenreFilter() {
    const [demographicGenresData, setDemographicGenres] = useState<AdvancedSearchFiltersType>();
    const [genreGenresData, setGenreGenres] = useState<AdvancedSearchFiltersType>();
    const [themeGenresData, setThemeGenres] = useState<AdvancedSearchFiltersType>();
    const [demographicGenresValue, setDemographicGenresValue] = useState<string[]>([]);
    const [genreGenresValue, setGenreGenresValue] = useState<string[]>([]);
    const [themeGenresValue, setThemeGenresValue] = useState<string[]>([]);
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

    if (isPending) {
        return (
            <>
                <Skeleton radius="md" w="100%" h={36} />
                <Skeleton radius="md" w="100%" h={36} />
                <Skeleton radius="md" w="100%" h={36} />
            </>
        );
    }

    if (error) {
        return (
            <>Ошибка: {error.message}</>
        );
    }

    return (
        <>
            <MultiSelect
                value={demographicGenresValue}
                onChange={setDemographicGenresValue}
                radius="md"
                placeholder="Аудитория"
                data={demographicGenresData}
            />
            <MultiSelect
                value={genreGenresValue}
                onChange={setGenreGenresValue}
                radius="md"
                placeholder="Жанры"
                data={genreGenresData}
            />
            <MultiSelect
                value={themeGenresValue}
                onChange={setThemeGenresValue}
                radius="md"
                placeholder="Темы"
                data={themeGenresData}
            />
        </>
    );
}
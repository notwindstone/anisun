import {MultiSelect, Skeleton} from "@mantine/core";
import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import {AdvancedSearchFiltersType} from "@/types/AdvancedSearch/AdvancedSearchFilters.type";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";
import classes from '@/components/Filters/FiltersSelect.module.css';
import {useDisclosure} from "@mantine/hooks";
import useCustomTheme from "@/hooks/useCustomTheme";
import {variables} from "@/configs/variables";

export default memo(function GenreFilter({
    demographicGenresValue,
    setDemographicGenresValue,
    genreGenresValue,
    setGenreGenresValue,
    themeGenresValue,
    setThemeGenresValue
}: {
    demographicGenresValue: string[],
    setDemographicGenresValue: Dispatch<SetStateAction<string[]>>,
    genreGenresValue: string[],
    setGenreGenresValue: Dispatch<SetStateAction<string[]>>,
    themeGenresValue: string[],
    setThemeGenresValue: Dispatch<SetStateAction<string[]>>
}) {
    const { theme } = useCustomTheme();
    const [demographicGenresData, setDemographicGenres] = useState<AdvancedSearchFiltersType>();
    const [genreGenresData, setGenreGenres] = useState<AdvancedSearchFiltersType>();
    const [themeGenresData, setThemeGenres] = useState<AdvancedSearchFiltersType>();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });
    const [demographicGenresFocused, demographicGenresHandler] = useDisclosure(false);
    const [genreGenresFocused, genreGenresHandler] = useDisclosure(false);
    const [themeGenresFocused, themeGenresHandler] = useDisclosure(false);

    const color = theme.color;
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    const calculatedColor = isMantineColor ? mantineColor : color;

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
                styles={{
                    input: {
                        borderColor: demographicGenresFocused ? calculatedColor : undefined
                    }
                }}
                onDropdownOpen={demographicGenresHandler.open}
                onDropdownClose={demographicGenresHandler.close}
                classNames={classes}
                value={demographicGenresValue}
                onChange={setDemographicGenresValue}
                radius="md"
                placeholder="Аудитория"
                data={demographicGenresData}
            />
            <MultiSelect
                styles={{
                    input: {
                        borderColor: genreGenresFocused ? calculatedColor : undefined
                    }
                }}
                onDropdownOpen={genreGenresHandler.open}
                onDropdownClose={genreGenresHandler.close}
                classNames={classes}
                value={genreGenresValue}
                onChange={setGenreGenresValue}
                radius="md"
                placeholder="Жанры"
                data={genreGenresData}
            />
            <MultiSelect
                styles={{
                    input: {
                        borderColor: themeGenresFocused ? calculatedColor : undefined
                    }
                }}
                onDropdownOpen={themeGenresHandler.open}
                onDropdownClose={themeGenresHandler.close}
                classNames={classes}
                value={themeGenresValue}
                onChange={setThemeGenresValue}
                radius="md"
                placeholder="Темы"
                data={themeGenresData}
            />
        </>
    );
});
import {ComboboxData, MultiSelect, Skeleton} from "@mantine/core";
import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import {AdvancedSearchFiltersType} from "@/types/AdvancedSearch/AdvancedSearchFilters.type";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";
import classes from '@/components/Filters/FiltersSelect.module.css';
import {useDisclosure} from "@mantine/hooks";
import useCustomTheme from "@/hooks/useCustomTheme";
import calculateColor from "@/utils/Misc/calculateColor";
import {useTranslations} from "next-intl";

function GenreMultiSelect({
    color,
    genresValue,
    setGenresValue,
    genresData,
    placeholder,
}: {
    color: string | undefined;
    genresValue: string[];
    setGenresValue: Dispatch<SetStateAction<string[]>>;
    genresData: ComboboxData | undefined;
    placeholder: string;
}) {
    const [focused, { open, close }] = useDisclosure(false);

    return (
        <MultiSelect
            styles={{
                input: {
                    borderColor: focused ? color : undefined
                }
            }}
            onDropdownOpen={open}
            onDropdownClose={close}
            classNames={classes}
            value={genresValue}
            onChange={setGenresValue}
            radius="md"
            placeholder={placeholder}
            data={genresData}
        />
    );
}

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
    const translateInfo = useTranslations('Info');
    const translateCommon = useTranslations('Common');
    const translateSpecific = useTranslations('Specific');

    const currentLocale = translateInfo('locale');
    const isEnglish = currentLocale === 'en';

    const { theme } = useCustomTheme();
    const [demographicGenresData, setDemographicGenres] = useState<AdvancedSearchFiltersType>();
    const [genreGenresData, setGenreGenres] = useState<AdvancedSearchFiltersType>();
    const [themeGenresData, setThemeGenres] = useState<AdvancedSearchFiltersType>();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    const color = calculateColor(theme.color);
    
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
                        label: isEnglish ? genre.name : genre.russian,
                        value: genre.id,
                    });
                case "genre":
                    return genreGenres.push({
                        label: isEnglish ? genre.name : genre.russian,
                        value: genre.id,
                    });
                case "theme":
                    return themeGenres.push({
                        label: isEnglish ? genre.name : genre.russian,
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
            <>{translateCommon('error')}: {error.message}</>
        );
    }

    return (
        <>
            <GenreMultiSelect
                color={color}
                genresValue={demographicGenresValue}
                setGenresValue={setDemographicGenresValue}
                placeholder={translateSpecific('genres-demographic')}
                genresData={demographicGenresData}
            />
            <GenreMultiSelect
                color={color}
                genresValue={genreGenresValue}
                setGenresValue={setGenreGenresValue}
                placeholder={translateSpecific('genres-genre')}
                genresData={genreGenresData}
            />
            <GenreMultiSelect
                color={color}
                genresValue={themeGenresValue}
                setGenresValue={setThemeGenresValue}
                placeholder={translateSpecific('genres-theme')}
                genresData={themeGenresData}
            />
        </>
    );
});
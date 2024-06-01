import {Stack} from "@mantine/core";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import AdvancedSearchFiltersChildren
    from "@/components/AdvancedSearch/AdvancedSearchFilters/AdvancedSearchFiltersChildren/AdvancedSearchFiltersChildren";

const FIRST_ANIME_AIRED_ON = 1917;

export default function AdvancedSearchFilters() {
    const [censored, { toggle: toggleCensored }] = useDisclosure(false);
    const [durations, setDurations] = useState<string[]>([]);
    const [demographicGenresValue, setDemographicGenresValue] = useState<string[]>([]);
    const [genreGenresValue, setGenreGenresValue] = useState<string[]>([]);
    const [themeGenresValue, setThemeGenresValue] = useState<string[]>([]);
    const [kinds, setKinds] = useState<string[]>([]);
    const [limit, setLimit] = useState(20);
    const [order, setOrder] = useState<string | null>('');
    const [ratings, setRatings] = useState<string[]>();
    const [score, setScore] = useState(7);

    const [yearStart, setYearStart] = useState(FIRST_ANIME_AIRED_ON);
    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear);
    const [rangedYears, setRangedYears] = useState<[number, number]>([yearStart, currentYear]);
    const [yearsRanged, { toggle: toggleYearsRanged }] = useDisclosure(false);
    const [seasons, setSeasons] = useState<string[]>([]);

    const [statuses, setStatuses] = useState<string[]>([]);
    const [studio, setStudio] = useState<string | null>('');

    return (
        <AdvancedSearchFiltersContext.Provider
            value={{
                censored,
                toggleCensored,
                durations,
                setDurations,
                demographicGenresValue,
                setDemographicGenresValue,
                genreGenresValue,
                setGenreGenresValue,
                themeGenresValue,
                setThemeGenresValue,
                kinds,
                setKinds,
                limit,
                setLimit,
                order,
                setOrder,
                ratings,
                setRatings,
                score,
                setScore,
                year,
                setYear,
                rangedYears,
                setRangedYears,
                yearStart,
                setYearStart,
                yearsRanged,
                toggleYearsRanged,
                seasons,
                setSeasons,
                statuses,
                setStatuses,
                studio,
                setStudio,
            }}
        >
            <Stack flex={1}>
                <AdvancedSearchFiltersChildren />
            </Stack>
        </AdvancedSearchFiltersContext.Provider>
    );
}
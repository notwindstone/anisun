import OrderFilter from "@/components/Filters/OrderFilter/OrderFilter";
import KindFilter from "@/components/Filters/KindFilter/KindFilter";
import LimitFilter from "@/components/Filters/LimitFilter/LimitFilter";
import StatusFilter from "@/components/Filters/StatusFilter/StatusFilter";
import SeasonFilter from "@/components/Filters/SeasonFilter/SeasonFilter";
import ScoreFilter from "@/components/Filters/ScoreFilter/ScoreFilter";
import DurationFilter from "@/components/Filters/DurationFilter/DurationFilter";
import GenreFilter from "@/components/Filters/GenreFilter/GenreFilter";
import RatingFilter from "@/components/Filters/RatingFilter/RatingFilter";
import StudioFilter from "@/components/Filters/StudioFilter/StudioFilter";
import CensoredFilter from "@/components/Filters/CensoredFilter/CensoredFilter";
import {Stack} from "@mantine/core";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

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
                <GenreFilter />
                <OrderFilter />
                <KindFilter />
                <LimitFilter />
                <StatusFilter />
                <SeasonFilter />
                <ScoreFilter />
                <DurationFilter />
                <RatingFilter />
                <StudioFilter />
                <CensoredFilter />
            </Stack>
        </AdvancedSearchFiltersContext.Provider>
    );
}
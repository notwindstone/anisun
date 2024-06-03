import {Stack} from "@mantine/core";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import AdvancedSearchFiltersChildren
    from "@/components/AdvancedSearch/AdvancedSearchFilters/AdvancedSearchFiltersChildren/AdvancedSearchFiltersChildren";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import getAllSearchParams from "@/utils/Misc/getAllSearchParams";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import classes from './AdvancedSearchFilters.module.css';

const FIRST_ANIME_AIRED_ON = 1917;

export default function AdvancedSearchFilters() {
    const [filtersToggled, { toggle: toggleFilters }] = useDisclosure(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const allSearchParams = getAllSearchParams(searchParams);

    const initialCensored = allSearchParams.censored === "true";
    const initialDurations = allSearchParams.durations ?? [];
    const initialDemographicGenresValue = allSearchParams.demographicGenres ?? [];
    const initialGenreGenres = allSearchParams.genreGenres ?? [];
    const initialThemeGenres = allSearchParams.themeGenres ?? [];
    const initialKinds = allSearchParams.kinds ?? [];
    const initialLimit = allSearchParams.limit;
    const initialOrder = allSearchParams.order ?? '';
    const initialRatings = allSearchParams.ratings ?? [];
    const initialScore = allSearchParams.score;
    const initialYear = allSearchParams.year;
    const initialRangedYears = allSearchParams.rangedYears;
    const initialYearsRanged = allSearchParams.yearsRanged === "true";
    const initialSeasons = allSearchParams.seasons ?? [];
    const initialStatuses = allSearchParams.statuses ?? [];
    const initialStudio = allSearchParams.studio;

    const [censored, { toggle: toggleCensored }] = useDisclosure(initialCensored);
    const [durations, setDurations] = useState<string[]>(initialDurations);
    const [demographicGenresValue, setDemographicGenresValue] = useState<string[]>(initialDemographicGenresValue);
    const [genreGenresValue, setGenreGenresValue] = useState<string[]>(initialGenreGenres);
    const [themeGenresValue, setThemeGenresValue] = useState<string[]>(initialThemeGenres);
    const [kinds, setKinds] = useState<string[]>(initialKinds);
    const [limit, setLimit] = useState(initialLimit);
    const [order, setOrder] = useState<string | null>(initialOrder);
    const [ratings, setRatings] = useState<string[] | undefined>(initialRatings);
    const [score, setScore] = useState(initialScore);
    const [yearStart, setYearStart] = useState(FIRST_ANIME_AIRED_ON);
    const [year, setYear] = useState(initialYear);
    const [rangedYears, setRangedYears] = useState<[number, number]>(initialRangedYears);
    const [yearsRanged, { toggle: toggleYearsRanged }] = useDisclosure(initialYearsRanged);
    const [seasons, setSeasons] = useState<string[]>(initialSeasons);
    const [statuses, setStatuses] = useState<string[]>(initialStatuses);
    const [studio, setStudio] = useState<string | null>(initialStudio);

    function setFilters() {
        let pathnameWithSearchParams = `${pathname}`;

        pathnameWithSearchParams = `${pathnameWithSearchParams}?censored=${censored}`;

        if (durations.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&durations=${durations}`;
        }

        if (demographicGenresValue.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&demographicGenres=${demographicGenresValue}`;
        }

        if (genreGenresValue.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&genreGenres=${genreGenresValue}`;
        }

        if (themeGenresValue.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&themeGenres=${themeGenresValue}`;
        }

        if (kinds.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&kinds=${kinds}`;
        }

        if (limit) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&limit=${limit}`;
        }

        if (order) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&order=${order}`;
        }

        if (ratings?.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&ratings=${ratings}`;
        }

        if (score) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&score=${score}`;
        }

        // Never Nesters, sorry, I'm tired.
        if (yearsRanged) {
            if (!isNaN(rangedYears[0]) && !isNaN(rangedYears[1])) {
                pathnameWithSearchParams = `${pathnameWithSearchParams}&yearsRanged=true&rangedYears=${rangedYears}`;
            }
        } else {
            if (!isNaN(year)) {
                pathnameWithSearchParams = `${pathnameWithSearchParams}&yearsRanged=false&year=${year}`;
            }
        }

        if (seasons.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&seasons=${seasons}`;
        }

        if (statuses.length) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&statuses=${statuses}`;
        }

        if (studio) {
            pathnameWithSearchParams = `${pathnameWithSearchParams}&studio=${studio}`;
        }

        NProgress.start();
        router.push(pathnameWithSearchParams);
        NProgress.done();
    }

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
                <DecoratedButton variant="light" onClick={toggleFilters}>
                    Раскрыть фильтры
                </DecoratedButton>
                <Stack className={filtersToggled && classes.filters}>
                    <AdvancedSearchFiltersChildren />
                    <DecoratedButton onClick={setFilters}>
                        Сохранить
                    </DecoratedButton>
                </Stack>
            </Stack>
        </AdvancedSearchFiltersContext.Provider>
    );
}
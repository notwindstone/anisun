import GenreFilter from "@/components/Filters/GenreFilter/GenreFilter";
import OrderFilter from "@/components/Filters/OrderFilter/OrderFilter";
import KindFilter from "@/components/Filters/KindFilter/KindFilter";
import LimitFilter from "@/components/Filters/LimitFilter/LimitFilter";
import StatusFilter from "@/components/Filters/StatusFilter/StatusFilter";
import SeasonFilter from "@/components/Filters/SeasonFilter/SeasonFilter";
import ScoreFilter from "@/components/Filters/ScoreFilter/ScoreFilter";
import DurationFilter from "@/components/Filters/DurationFilter/DurationFilter";
import RatingFilter from "@/components/Filters/RatingFilter/RatingFilter";
import StudioFilter from "@/components/Filters/StudioFilter/StudioFilter";
import CensoredFilter from "@/components/Filters/CensoredFilter/CensoredFilter";
import {memo, useContext, useMemo} from "react";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function AdvancedSearchFiltersChildren() {
    const {
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
    } = useContext(AdvancedSearchFiltersContext);

    const MemoizedGenreFilter = memo(
        GenreFilter,
    );
    const MemoizedCensoredFilter = useMemo(() =>
            <CensoredFilter censored={censored} toggleCensored={toggleCensored} />,
        [censored, toggleCensored]
    );

    return (
        <>
            <MemoizedGenreFilter />
            <OrderFilter />
            <KindFilter />
            <LimitFilter />
            <StatusFilter />
            <SeasonFilter />
            <ScoreFilter />
            <DurationFilter />
            <RatingFilter />
            <StudioFilter />
            {MemoizedCensoredFilter}
        </>
    );
}
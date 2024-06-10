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
import {useContext} from "react";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";
import classes from './AdvancedSearchFiltersChildren.module.css';
import {Accordion, rem, Stack} from "@mantine/core";

const groceries = [
    {
        type: 'Apples',
    },
    {
        type: 'Bananas',
    },
    {
        type: 'Broccoli',
    },
];

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

    const items = groceries.map((item) => (
        <Accordion.Item key={item.type} value={item.type}>
            <Accordion.Control>{item.type}</Accordion.Control>
            <Accordion.Panel>
                <Stack>
                    <GenreFilter
                        demographicGenresValue={demographicGenresValue}
                        setDemographicGenresValue={setDemographicGenresValue}
                        genreGenresValue={genreGenresValue}
                        setGenreGenresValue={setGenreGenresValue}
                        themeGenresValue={themeGenresValue}
                        setThemeGenresValue={setThemeGenresValue}
                    />
                    <OrderFilter
                        order={order}
                        setOrder={setOrder}
                    />
                    <KindFilter
                        kinds={kinds}
                        setKinds={setKinds}
                    />
                    <LimitFilter
                        limit={limit}
                        setLimit={setLimit}
                    />
                    <StatusFilter
                        statuses={statuses}
                        setStatuses={setStatuses}
                    />
                    <SeasonFilter
                        seasons={seasons}
                        setSeasons={setSeasons}
                        year={year}
                        setYear={setYear}
                        setRangedYears={setRangedYears}
                        rangedYears={rangedYears}
                        setYearStart={setYearStart}
                        yearsRanged={yearsRanged}
                        toggleYearsRanged={toggleYearsRanged}
                        yearStart={yearStart}
                    />
                    <ScoreFilter
                        score={score}
                        setScore={setScore}
                    />
                    <DurationFilter
                        durations={durations}
                        setDurations={setDurations}
                    />
                    <RatingFilter
                        ratings={ratings}
                        setRatings={setRatings}
                    />
                    <StudioFilter
                        studio={studio}
                        setStudio={setStudio}
                    />
                    <CensoredFilter
                        censored={censored}
                        toggleCensored={toggleCensored}
                    />
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <>
            <Accordion
                p={rem(8)}
                defaultValue="Apples"
                classNames={classes}
            >
                {items}
            </Accordion>
        </>
    );
}
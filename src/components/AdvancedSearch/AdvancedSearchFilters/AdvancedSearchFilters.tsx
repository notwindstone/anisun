import OrderFilter from "@/components/Filters/OrderFilter/OrderFilter";
import KindFilter from "@/components/Filters/KindFilter/KindFilter";
import LimitFilter from "@/components/Filters/LimitFilter/LimitFilter";
import StatusFilter from "@/components/Filters/StatusFilter/StatusFilter";
import SeasonFilter from "@/components/Filters/SeasonFilter/SeasonFilter";
import ScoreFilter from "@/components/Filters/ScoreFilter/ScoreFilter";
import DurationFilter from "@/components/Filters/DurationFilter/DurationFilter";
import GenreFilter from "@/components/Filters/GenreFilter/GenreFilter";

export default function AdvancedSearchFilters() {
    return (
        <>
            <GenreFilter />
            <OrderFilter />
            <KindFilter />
            <LimitFilter />
            <StatusFilter />
            <SeasonFilter />
            <ScoreFilter />
            <DurationFilter />
        </>
    );
}
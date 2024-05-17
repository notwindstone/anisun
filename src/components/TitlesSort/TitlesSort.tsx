import {useState} from "react";
import {SegmentedControl} from "@mantine/core";
import { sorting } from '@/configs/globalVariables.json';

const ALL_TITLES = sorting.all;
const ANNOUNCED_TITLES = sorting.announced;
const ONGOING_TITLES = sorting.ongoing;
const RELEASED_TITLES = sorting.released

export default function TitlesSort() {
    const [sortingType, setSortingType] = useState<string>(ALL_TITLES.value);

    return (
        <SegmentedControl
            value={sortingType}
            onChange={setSortingType}
            data={[
                ALL_TITLES,
                ANNOUNCED_TITLES,
                ONGOING_TITLES,
                RELEASED_TITLES,
            ]}
        />
    );
}
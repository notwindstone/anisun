"use client"

import {SegmentedControl} from "@mantine/core";
import { sorting } from '@/configs/globalVariables.json';
import {useContext} from "react";
import {TitlesSortContext} from "@/utils/Contexts/Contexts";

const ALL_TITLES = sorting.all;
const ANNOUNCED_TITLES = sorting.announced;
const ONGOING_TITLES = sorting.ongoing;
const RELEASED_TITLES = sorting.released

export default function TitlesSort() {
    const { sortingType, setSortingType } = useContext(TitlesSortContext);

    return (
        <SegmentedControl
            withItemsBorders={false}
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
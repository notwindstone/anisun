"use client"

import {SegmentedControl} from "@mantine/core";
import { variables } from '@/configs/variables';
import {useContext} from "react";
import {TitlesSortContext} from "@/utils/Contexts/Contexts";

const sorting = variables.sorting
const LATEST_TITLES = sorting.latest;
const ANNOUNCED_TITLES = sorting.anons;
const ONGOING_TITLES = sorting.ongoing;
const RELEASED_TITLES = sorting.released

export default function TitlesSort() {
    const { sortingType, setSortingType } = useContext(TitlesSortContext);

    return (
        <SegmentedControl
            withItemsBorders={false}
            value={sortingType}
            // @ts-ignore
            onChange={setSortingType}
            data={[
                LATEST_TITLES,
                ANNOUNCED_TITLES,
                ONGOING_TITLES,
                RELEASED_TITLES,
            ]}
        />
    );
}
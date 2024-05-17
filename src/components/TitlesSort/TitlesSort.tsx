import {useState} from "react";
import {SegmentedControl} from "@mantine/core";

const ALL_TITLES = { label: 'Все', value: 'all' }
const ANNOUNCED_TITLES = { label: 'Анонсированные', value: 'anons' }
const ONGOING_TITLES = { label: 'В работе', value: 'ongoing' }
const RELEASED_TITLES = { label: 'Завершённые', value: 'released' }

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
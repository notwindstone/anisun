"use client";

import SearchInput from "@/components/SearchInput/SearchInput";
import {Flex} from "@mantine/core";
import AdvancedSearchFilters from "@/components/AdvancedSearch/AdvancedSearchFilters/AdvancedSearchFilters";
import {useSearchParams} from "next/navigation";
import classes from './AdvancedSearch.module.css';

export default function AdvancedSearch() {
    const searchParams = useSearchParams();
    const entries = searchParams.get('studio');
    console.log(entries);
    return (
        <>
            <Flex className={classes.wrapper}>
                <SearchInput />
                <AdvancedSearchFilters />
            </Flex>
        </>
    );
}

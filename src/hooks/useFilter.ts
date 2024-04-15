import {useEffect, useState} from "react";

export function useFilter() {
    const mostLikes = 'MOST_LIKES'
    const toNewest = 'TO_NEWEST'
    const toOldest = 'TO_OLDEST'

    const [filters, setFilters] = useState(toNewest)

    useEffect(() => {

    }, []);
}
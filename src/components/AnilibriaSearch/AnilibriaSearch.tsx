"use client";

import { useContext } from "react";
import { AnilibriaSearchContext } from "@/utils/providers/AnilibriaSearchProvider";

export default function AnilibriaSearch() {
    const { search, setSearch } = useContext(AnilibriaSearchContext);

    return (
        <>
            {search}asd
        </>
    );
}
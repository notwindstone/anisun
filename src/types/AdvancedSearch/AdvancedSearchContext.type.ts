import {Dispatch, SetStateAction} from "react";

export type AdvancedSearchContextType = {
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
};
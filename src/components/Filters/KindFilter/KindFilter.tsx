import {MultiSelect} from "@mantine/core";
import {useContext} from "react";
import {variables} from "@/configs/variables";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function KindFilter() {
    const { kinds, setKinds } = useContext(AdvancedSearchFiltersContext);

    return (
        <MultiSelect
            value={kinds}
            onChange={setKinds}
            data={variables.filters.kind}
        />
    );
}
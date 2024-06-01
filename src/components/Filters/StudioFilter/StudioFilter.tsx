import {useContext} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function StudioFilter() {
    const { studio, setStudio } = useContext(AdvancedSearchFiltersContext);

    return (
        <>
            <Select
                placeholder="Студия"
                value={studio}
                onChange={setStudio}
                data={variables.filters.studio}
            />
        </>
    );
}
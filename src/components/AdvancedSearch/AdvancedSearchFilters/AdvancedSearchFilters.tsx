import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";

export default function AdvancedSearchFilters() {
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    async function getGenres() {

    }

    return (
        <>
            <Select
                radius="md"
                placeholder="Жанр"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
        </>
    );
}
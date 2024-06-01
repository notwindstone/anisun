import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function AdvancedSearchFilters() {
    const router = useRouter();
    const { data, isPending, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    async function getGenres() {

    }

    function selectGenre(genre: string | null) {
        router.push("/titles?genre=" + genre);
    }

    return (
        <>
            <Select
                onChange={(genre) => selectGenre(genre)}
                radius="md"
                placeholder="Жанр"
                data={[
                    '1',
                    '2',
                    '3',
                    '4'
                ]}
            />
        </>
    );
}
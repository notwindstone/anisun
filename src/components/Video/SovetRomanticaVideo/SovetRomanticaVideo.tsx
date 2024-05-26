import {AspectRatio} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {sovetromantica} from "@/lib/sovetromantica/sovetromantica";

export default function SovetRomanticaVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'sovetromantica', id],
        queryFn: async () => getSovetRomanticaEpisodes(),
    });

    async function getSovetRomanticaEpisodes() {
        const animeInfo = await sovetromantica.search({ name: "Shuumatsu train doko e iku" });
        console.log(animeInfo);
    }

    console.log(data, isPending, error);

    return (
        <AspectRatio ratio={16 / 9}>

        </AspectRatio>
    );
}
import {AspectRatio} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {sovetromantica} from "@/lib/sovetromantica/sovetromantica";
import classes from './SovetRomantica.module.css';

export default function SovetRomanticaVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'sovetromantica', id],
        queryFn: async () => getSovetRomanticaEpisodes(),
    });

    async function getSovetRomanticaEpisodes() {
        const animeInfo = await sovetromantica.search({ name: "Shuumatsu train doko e iku" });
        const animeShikimoriId = animeInfo?.[0]?.anime_shikimori.toString();

        if (id !== animeShikimoriId) {
            return null;
        }

        const animeId = animeInfo?.[0]?.anime_id;
        return await sovetromantica.episodes({ id: animeId });
    }

    console.log(data);

    if (isPending) {
        return <>Loading</>;
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    return (
        <AspectRatio ratio={16 / 9}>
            <iframe
                className={classes.frame}
                src={data?.[0]?.embed}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}
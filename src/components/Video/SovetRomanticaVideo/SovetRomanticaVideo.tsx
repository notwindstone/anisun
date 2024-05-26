import {ActionIcon, AspectRatio} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {sovetromantica} from "@/lib/sovetromantica/sovetromantica";
import classes from './SovetRomantica.module.css';
import {AnimeInfoType} from "@/types/SovetRomantica/Responses/AnimeInfo.type";
import {EpisodesType} from "@/types/SovetRomantica/Responses/Episodes.type";
import {client} from "@/lib/shikimori/client";
import {IconMenu2} from "@tabler/icons-react";

export default function SovetRomanticaVideo({ id }: { id: string }) {
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'sovetromantica', id],
        queryFn: async () => getSovetRomanticaEpisodes(),
    });

    async function getSovetRomanticaEpisodes() {
        const shikimoriName = (await shikimori.animes.byId({
            ids: id,
            filter: [
                'name'
            ],
        }))?.animes?.[0]?.name;
        const animeInfo: AnimeInfoType = await sovetromantica.search({ name: shikimoriName });
        const animeShikimoriId = animeInfo?.[0]?.anime_shikimori.toString();

        if (id !== animeShikimoriId) {
            return null;
        }

        const animeId = animeInfo?.[0]?.anime_id;
        const episodes: EpisodesType = await sovetromantica.episodes({ id: animeId });

        if (episodes.length === 0) {
            return null;
        }

        return episodes;
    }

    if (isPending) {
        return <>Loading</>;
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    return (
        <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
            <ActionIcon
                variant="light"
                radius="md"
                className={classes.switchEpisodes}
            >
                <IconMenu2 className={classes.playlistIcon} />
            </ActionIcon>
            <iframe
                className={classes.frame}
                src={data?.[0]?.embed}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}
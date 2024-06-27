import {ActionIcon, AspectRatio, Popover, rem, Stack} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {sovetromantica} from "@/lib/sovetromantica/sovetromantica";
import classes from './SovetRomantica.module.css';
import {AnimeInfoType} from "@/types/SovetRomantica/Responses/AnimeInfo.type";
import {EpisodesType} from "@/types/SovetRomantica/Responses/Episodes.type";
import {client} from "@/lib/shikimori/client";
import {IconMenu2} from "@tabler/icons-react";
import {useState} from "react";
import SovetRomanticaVideoButton
    from "@/components/Video/SovetRomanticaVideo/SovetRomanticaVideoButton/SovetRomanticaVideoButton";
import VideoNotFound from "@/components/Video/VideoNotFound/VideoNotFound";
import VideoSkeleton from "@/components/Video/VideoSkeleton/VideoSkeleton";
import {useTranslations} from "next-intl";

export default function SovetRomanticaVideo({ id }: { id: string }) {
    const translate = useTranslations('Translations');
    const [opened, setOpened] = useState(false);
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'sovetromantica', id],
        queryFn: async () => getSovetRomanticaEpisodes(),
    });
    const [embedSrc, setEmbedSrc] = useState(data?.[0]?.embed);

    async function getSovetRomanticaEpisodes() {
        const shikimoriName = (await shikimori.animes.byId({
            ids: id,
            filter: [
                'name'
            ],
        }))?.animes?.[0]?.name;
        const animeInfo: AnimeInfoType = await sovetromantica.search({ name: shikimoriName });

        // SovetRomantica always sends responses with status 200
        // with real status code being located in the response body
        // @ts-ignore
        if (animeInfo?.code === 503) {
            return null;
        }

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

    function togglePopover() {
        setOpened((o) => !o);
    }

    function changeEpisode(episodeSrc?: string) {
        setEmbedSrc(episodeSrc);
    }

    if (isPending) {
        return (
            <VideoSkeleton />
        );
    }

    if (error) {
        return (
            <>
                {translate('common__descriptive-error-label')}: {error.message}
            </>
        );
    }

    if (!isPending && !data) {
        return <VideoNotFound />;
    }

    data?.sort(function compare(current, next) {
        return (current.episode_count ?? 0) - (next.episode_count ?? 1);
    });

    const buttons = data?.map((episode) => {
        const isActive
            = embedSrc === episode.embed
            || (embedSrc === undefined && data?.[0]?.embed === episode.embed);

        return (
            <SovetRomanticaVideoButton
                key={episode.episode_id}
                isActive={isActive}
                changeEpisode={() => changeEpisode(episode.embed)}
                episodeCount={episode.episode_count}
            />
        );
    });

    return (
        <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
            <Popover
                classNames={{
                    dropdown: classes.dropdown
                }}
                position="bottom-end"
                transitionProps={{ transition: "scale-y" }}
                opened={opened}
                onChange={setOpened}
                radius="md"
            >
                <Popover.Target>
                    <ActionIcon
                        onClick={togglePopover}
                        variant="light"
                        radius="md"
                        className={classes.switchEpisodes}
                    >
                        <IconMenu2 className={classes.playlistIcon} />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p={rem(8)}>
                    <Stack gap={rem(8)}>
                        {buttons}
                    </Stack>
                </Popover.Dropdown>
            </Popover>
            <iframe
                className={classes.frame}
                src={embedSrc ?? data?.[0]?.embed}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}
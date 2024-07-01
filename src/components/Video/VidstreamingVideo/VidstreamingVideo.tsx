import {useQuery} from "@tanstack/react-query";
import VideoSkeleton from "@/components/Video/VideoSkeleton/VideoSkeleton";
import VideoNotFound from "@/components/Video/VideoNotFound/VideoNotFound";
import {useTranslations} from "next-intl";
import {animetize} from "@/lib/animetize/animetize";
import {usePathname} from "next/navigation";
import {ActionIcon, AspectRatio, Popover, rem, Stack} from "@mantine/core";
import classes from '@/components/Video/GeneralFrameVideo.module.css';
import {IconMenu2} from "@tabler/icons-react";
import {useState} from "react";
import FrameVideoButton from "@/components/Video/FrameVideoButton/FrameVideoButton";

export default function VidstreamingVideo() {
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [episodesCount, setEpisodesCount] = useState(0);
    const [opened, setOpened] = useState(false);

    const animetizeClient = animetize();
    const pathname = usePathname();

    // "/ru/titles/55888-mushoku-tensei-ii-isekai-ittara-honki-dasu-part-2" => "mushoku-tensei-ii-isekai-ittara-honki-dasu-part-2"
    const paths = pathname.split('/');
    const idArray = paths[paths.length - 1].split('-');
    idArray.shift();
    const animeId = idArray.join('-');

    const translate = useTranslations('Translations');

    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'vidstreaming', animeId, currentEpisode],
        queryFn: async () => getVidstreamingVideo(),
    });

    const { data: episodesCountData } = useQuery({
        queryKey: ['animeInfo', 'animetize', animeId],
        queryFn: async () => getAnimetizeInfo(),
    });

    async function getAnimetizeInfo() {
        const animeInfo = await animetizeClient.animes.getAnimeInfo({
            id: animeId,
        });

        const animeInfoEpisodesCount = animeInfo.episodes.length;
        setEpisodesCount(animeInfoEpisodesCount);

        return animeInfoEpisodesCount;
    }

    async function getVidstreamingVideo() {
        return await animetizeClient.animes.getSubsEmbed({
            id: animeId,
            episode: currentEpisode,
        });
    }

    if (isPending && !episodesCountData) {
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

    function togglePopover() {
        setOpened((o) => !o);
    }

    function changeEpisode(episode: number) {
        setCurrentEpisode(episode);
    }

    const buttons = Array.from(Array(episodesCount).keys()).map((episode) => {
        const episodeNumber = episode + 1;
        const isActive = currentEpisode === episodeNumber;

        return (
            <FrameVideoButton
                key={episodeNumber}
                isActive={isActive}
                changeEpisode={() => changeEpisode(episodeNumber)}
                episodeCount={episodeNumber}
            />
        );
    });

    return (
        <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
            {
                episodesCountData && (
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
                            <Stack className={classes.dropdownStack} gap={rem(8)}>
                                {buttons}
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>
                )
            }
            {
                !isPending && (
                    <iframe
                        className={classes.frame}
                        src={data?.headers?.Referer}
                        allow="autoplay *; fullscreen *"
                    />
                )
            }
        </AspectRatio>
    );
}
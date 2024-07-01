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
    const [episodesCount, setEpisodesCount] = useState(0);
    const [opened, setOpened] = useState(false);
    const animetizeClient = animetize();
    const pathname = usePathname();
    const paths = pathname.split('/');
    const idArray = paths[paths.length - 1]
        .split('-');
    idArray.shift();
    const animeId = idArray.join('-');
    const translate = useTranslations('Translations');

    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'vidstreaming', animeId],
        queryFn: async () => getVidstreamingVideo(),
    });

    const { data: animeInfoData, isPending: isAnimeInfoDataPending, error: animeInfoError } = useQuery({
        queryKey: ['animeInfo', 'animetize', animeId],
        queryFn: async () => getAnimetizeInfo(),
    });

    const [embedSrc, setEmbedSrc] = useState(data?.headers?.Referer);

    async function getAnimetizeInfo() {
        return 'clown';
    }

    async function getVidstreamingVideo() {
        return await animetizeClient.animes.getSubsEmbed({
            id: animeId,
            episode: 1,
        });
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

    function togglePopover() {
        setOpened((o) => !o);
    }

    function changeEpisode(episodeSrc?: string) {
        setEmbedSrc(episodeSrc);
    }

    const embedLink = data?.headers?.Referer;



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
                    <Stack className={classes.dropdownStack} gap={rem(8)}>
                    </Stack>
                </Popover.Dropdown>
            </Popover>
            <iframe
                className={classes.frame}
                src={embedLink}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}
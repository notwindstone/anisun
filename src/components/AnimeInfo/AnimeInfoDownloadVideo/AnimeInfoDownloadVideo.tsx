import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import {Alert, Anchor, Group, Popover, rem, Skeleton, Stack, Text} from "@mantine/core";
import getShikimoriDataForAnilibriaQuery from "@/utils/Misc/getShikimoriDataForAnilibriaQuery";
import {useState} from "react";
import {AnimeTitleDownloadType} from "@/types/Anilibria/Responses/AnimeTitleDownload.type";
import classes from './AnimeInfoDownloadVideo.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import React from "react";
import {useTranslations} from "next-intl";

export default function AnimeInfoDownloadVideo({ id }: { id: string }) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();
    const [opened, setOpened] = useState(false);
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'download', id],
        queryFn: async () => getDownloadLinks(),
    });

    async function getDownloadLinks() {
        const {
            shikimoriOriginalName,
            shikimoriEnglishName,
            shikimoriRussianName,
            shikimoriYear,
            approximateDuration,
        } = await getShikimoriDataForAnilibriaQuery({ id });

        const anilibriaData: AnimeTitleDownloadType | undefined = await anilibria.advancedSearch(
            {
                originalName: shikimoriOriginalName,
                englishName: shikimoriEnglishName,
                russianName: shikimoriRussianName,
                year: shikimoriYear,
                duration: approximateDuration,
                filter: 'player.host,player.list[*].hls,torrents',
                limit: 1,
            }
        );

        if (!anilibriaData) {
            return null;
        }

        return anilibriaData;
    }

    function togglePopover() {
        setOpened((o) => !o);
    }

    if (isPending) {
        return <Skeleton radius="xl" width={rem(118)} height={rem(36)} />;
    }

    if (error) {
        return (
            <>
                {translate('common-error-label')}: {error.message}
            </>
        );
    }

    if (!data || !data?.player?.list || data?.torrents?.list.length === 0) {
        return;
    }

    const episodesTranslated = translate('common__episodes-label');
    const episodeTranslated = translate('common__episode-label');
    const fileTranslated = translate('common__file-label');
    const mirrorTranslated = translate('common__mirror-label');
    const linkTranslated = translate('common__link-label');

    return (
        <>
            <Popover position="bottom-end" radius="md" opened={opened} onChange={setOpened}>
                <Popover.Target>
                    <div>
                        <DecoratedButton
                            leftSection={<IconDownload size={18} stroke={1.5} />}
                            onClick={togglePopover}
                        >
                            {translate('common__download-label')}
                        </DecoratedButton>
                    </div>
                </Popover.Target>
                <Popover.Dropdown  className={classes.dropdown}>
                    <Stack pt={rem(4)} gap={rem(8)}>
                        <Alert
                            classNames={{
                                root: classes.alert,
                                message: classes.text
                            }}
                            radius="md"
                            color={theme.color}
                            title={translate('component__anime-info-download-video__dropdown-alert-title')}
                        >
                            {translate('component__anime-info-download-video__dropdown-alert-description')}
                        </Alert>
                        <Stack gap={rem(16)} p={rem(8)}>
                            {
                                data?.torrents?.list?.map((torrent) => {
                                    const mainAnilibriaUrl = `https://anilibria.tv${torrent.url}`;
                                    const mirrorAnilibriaUrl = `https://dl-20240602-3.anilib.moe${torrent.url}`;

                                    return (
                                        <React.Fragment key={torrent.torrent_id}>
                                            <Anchor
                                                className={classes.text}
                                                c={theme.color}
                                                href={torrent.magnet}
                                            >
                                                <Group gap={0} justify="space-between">
                                                    <Text className={classes.text}>
                                                        Anilibria, Magnet-{linkTranslated}: {episodesTranslated} {torrent.episodes.string}
                                                    </Text>
                                                    <Text className={classes.text}>
                                                        {torrent.quality.string} (.mkv)
                                                    </Text>
                                                </Group>
                                            </Anchor>
                                            <Anchor
                                                className={classes.text}
                                                c={theme.color}
                                                href={mainAnilibriaUrl}
                                            >
                                                <Group gap={0} justify="space-between">
                                                    <Text className={classes.text}>
                                                        Anilibria, Torrent-{fileTranslated}: {episodesTranslated} {torrent.episodes.string}
                                                    </Text>
                                                    <Text className={classes.text}>
                                                        {torrent.quality.string} (.mkv)
                                                    </Text>
                                                </Group>
                                            </Anchor>
                                            <Anchor
                                                className={classes.text}
                                                c={theme.color}
                                                href={mirrorAnilibriaUrl}
                                            >
                                                <Group gap={0} justify="space-between">
                                                    <Text className={classes.text}>
                                                        ({mirrorTranslated}) Anilibria, Torrent-{fileTranslated}: {episodesTranslated} {torrent.episodes.string}
                                                    </Text>
                                                    <Text className={classes.text}>
                                                        {torrent.quality.string} (.mkv)
                                                    </Text>
                                                </Group>
                                            </Anchor>
                                        </React.Fragment>
                                    );
                                })
                            }
                            {
                                data?.player?.list?.map((episode, episodeIndex) => {
                                    if (!episode?.hls) {
                                        return;
                                    }

                                    return Object.values(episode.hls).map((quality, qualityIndex) => {
                                        const qualityName = Object.keys(episode.hls)[qualityIndex];

                                        let qualityResolution;

                                        switch (qualityName) {
                                            case "fhd":
                                                qualityResolution = "1080p";
                                                break;
                                            case "hd":
                                                qualityResolution = "720p";
                                                break;
                                            case "sd":
                                                qualityResolution = "480p";
                                                break;
                                        }

                                        return (
                                            <Anchor
                                                className={classes.text}
                                                c={theme.color}
                                                key={quality}
                                                href={`https://${data.player.host}${quality}`}
                                            >
                                                <Group gap={0} justify="space-between">
                                                    <Text className={classes.text}>
                                                        Anilibria: {episodeTranslated} {episodeIndex}
                                                    </Text>
                                                    <Text className={classes.text}>
                                                        {qualityResolution} (.m3u8)
                                                    </Text>
                                                </Group>
                                            </Anchor>
                                        );
                                    });
                                })
                            }
                        </Stack>
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </>
    );
}
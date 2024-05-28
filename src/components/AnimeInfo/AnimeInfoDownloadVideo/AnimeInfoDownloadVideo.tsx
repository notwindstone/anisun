import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import {Anchor, Popover, rem, Skeleton, Stack} from "@mantine/core";
import getShikimoriDataForAnilibriaQuery from "@/utils/Misc/getShikimoriDataForAnilibriaQuery";
import {useState} from "react";
import {AnimeTitleDownloadType} from "@/types/Anilibria/Responses/AnimeTitleDownload.type";
import classes from './AnimeInfoDownloadVideo.module.css';

export default function AnimeInfoDownloadVideo({ id }: { id: string }) {
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
        return <Skeleton radius="xl" width={rem(126)} height={rem(36)} />;
    }

    if (error) {
        return <>Ошибка: {error.message}</>;
    }

    if (!data || !data?.player?.list || data?.torrents?.list.length === 0) {
        return;
    }
    console.log(data);
    return (
        <>
            <Popover radius="md" opened={opened} onChange={setOpened}>
                <Popover.Target>
                    <div>
                        <DecoratedButton
                            leftSection={<IconDownload size={18} stroke={1.5} />}
                            onClick={togglePopover}
                        >
                            Скачать
                        </DecoratedButton>
                    </div>
                </Popover.Target>
                <Popover.Dropdown className={classes.dropdown}>
                    <Stack>
                        {
                            data?.player?.list?.map((episode, episodeIndex) => {
                                if (!episode?.hls) {
                                    return;
                                }

                                return Object.values(episode.hls).map((quality, qualityIndex) => {
                                    const qualityName = Object.keys(episode.hls)[qualityIndex];

                                    return (
                                        <Anchor
                                            key={quality}
                                            href={`https://${data.player.host}${quality}`}
                                        >
                                            Напрямую (.m3u8): {episodeIndex} - {qualityName}
                                        </Anchor>
                                    );
                                });
                            })
                        }
                        {
                            data?.torrents?.list?.map((torrent) => {
                                return (
                                    <Anchor
                                        key={torrent.torrent_id}
                                        href={torrent.magnet}
                                    >
                                        Magnet: {torrent.episodes.string} - {torrent.quality.string}
                                    </Anchor>
                                );
                            })
                        }
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </>
    );
}
import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import {Popover, rem, Skeleton} from "@mantine/core";
import getShikimoriDataForAnilibriaQuery from "@/utils/Misc/getShikimoriDataForAnilibriaQuery";
import {useState} from "react";
import {AnimeTitleDownloadType} from "@/types/Anilibria/Responses/AnimeTitleDownload.type";

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

    return (
        <>
            <Popover radius="md" opened={opened} onChange={setOpened}>
                <Popover.Target>
                    <div>
                        <DecoratedButton
                            leftSection={<IconDownload size={24} stroke={1.5} />}
                            onClick={togglePopover}
                        >
                            Скачать
                        </DecoratedButton>
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    {data?.toString()}
                </Popover.Dropdown>
            </Popover>
        </>
    );
}
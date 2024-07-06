import {useTranslations} from "next-intl";
import classes from '@/components/Video/VideoPlayer/VideoPlayer.module.css';
import {Button} from "@mantine/core";
import {MediaPlayerInstance, useMediaStore} from "@vidstack/react";
import {RefObject} from "react";

export default function VideoPlayerNextEpisodeButton({
    setNextEpisode,
    mediaPlayerRef,
    episodesCount,
    currentEpisode,
}: {
    setNextEpisode: () => void;
    mediaPlayerRef: RefObject<MediaPlayerInstance | null>;
    episodesCount: number;
    currentEpisode: number;
}) {
    const translate = useTranslations('Translations');
    const { started, currentTime, duration } = useMediaStore(mediaPlayerRef);
    const hasNextEpisode = (episodesCount - currentEpisode) > 0;
    const isLastTenSeconds = (duration - currentTime) <= 10;

    return (
        <>
            {
                started && isLastTenSeconds && hasNextEpisode
                    ? (
                        <div className={classes.nextEpisode}>
                            <Button
                                radius="md"
                                variant="transparent"
                                className={classes.nextEpisodeButton}
                                onClick={setNextEpisode}
                            >
                                {translate('common__next-label')}
                            </Button>
                        </div>
                    )
                    : (
                        <div className={classes.nextEpisode} />
                    )
            }
        </>
    );
}
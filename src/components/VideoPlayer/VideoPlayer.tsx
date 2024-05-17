import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {MediaPlayer, MediaPlayerInstance, MediaProvider, Menu, useMediaStore} from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {useRef, useState} from 'react';
import videoPlayerTranslation from '../../configs/videoPlayerTranslation.json';
import classes from './VideoPlayer.module.css';
import {PlaylistIcon} from "@vidstack/react/icons";
import {Button, Text} from "@mantine/core";
import {VideoPlayerType} from "@/types/VideoPlayerType";
import makeHLSMasterPlaylist from "@/utils/makeHLSMasterPlaylist";

function changeEpisode({ player }: VideoPlayerType, episode: number) {
    const host = `https://${player.host}`;
    const source = player.list[episode].hls;

    return makeHLSMasterPlaylist({ host, source })
}

export default function VideoPlayer({ title, player, preview }: VideoPlayerType) {
    const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
    const { started, currentTime, duration } = useMediaStore(mediaPlayerRef);
    const [episodeSource, setEpisodeSource] = useState(changeEpisode({ player }, 1));
    const [hideMenu, setHideMenu] = useState('hidden');
    const [currentEpisode, setCurrentEpisode] = useState(1)

    const isLastTenSeconds = (duration - currentTime) <= 10
    const episodesAmount = Object.entries(player.list);

    const episodesList = episodesAmount.map((_value, index) => {
            const episodeIndex = index + 1;

            return (
                <Menu.Radio
                    className={
                        currentEpisode === episodeIndex ? classes.currentEpisodeButton : undefined
                    }
                    key={episodeIndex}
                    onClick={() => {
                            setCurrentEpisode(episodeIndex)
                            setEpisodeSource(changeEpisode({ player }, episodeIndex));
                        }
                    }
                >
                    Серия {episodeIndex}
                </Menu.Radio>);
        }
    );

    const episodesCount = episodesList.length
    const hasNextEpisode = (episodesCount - currentEpisode) > 0

    function setNextEpisode() {
        const nextEpisode = currentEpisode + 1

        setCurrentEpisode(nextEpisode)
        setEpisodeSource(changeEpisode({ player }, nextEpisode));
    }

    return (
        <div className={classes.wrapper}>
            <MediaPlayer
                onControlsChange={(isControlsShown) => {
                        if (!isControlsShown) {
                            setHideMenu('hidden');
                        } else {
                            setHideMenu('');
                        }
                    }
                }
                className={classes.player}
                title={title}
                aspect-ratio={16 / 9}
                src={
                    {
                        src: episodeSource,
                        type: 'application/x-mpegurl',
                    }
                }
                viewType="video"
                ref={mediaPlayerRef}
            >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} translations={videoPlayerTranslation}>
                    <Menu.Root className={`${classes.playlist} ${classes[hideMenu]} vds-menu`}>
                        <Menu.Button className={`${classes.playlistButton} vds - menu - button vds-button`} aria-label="Chapter Switch">
                            <PlaylistIcon className={classes.playlistIcon} />
                        </Menu.Button>
                        <Menu.Items className="vds-menu-items" placement="bottom start" offset={0}>
                            <Menu.RadioGroup>
                                {episodesList}
                            </Menu.RadioGroup>
                        </Menu.Items>
                        <Text fw={700} className={classes.currentEpisodeMarker}>{currentEpisode} серия</Text>
                        {
                            started && isLastTenSeconds && hasNextEpisode
                                ? (
                                    <div className={classes.nextEpisode}>
                                        <Button variant="transparent" className={classes.nextEpisodeButton} onClick={setNextEpisode}>Дальше</Button>
                                    </div>
                                )
                                : (
                                    <div className={classes.nextEpisode} />
                                )
                        }
                    </Menu.Root>
                </DefaultVideoLayout>
            </MediaPlayer>
        </div>
    );
}
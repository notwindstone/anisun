import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {MediaPlayer, MediaPlayerInstance, MediaProvider, Menu, useMediaStore} from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {useRef, useState} from 'react';
import videoPlayerTranslation from '@/configs/videoPlayerTranslation.json';
import classes from './VideoPlayer.module.css';
import './VideoPlayer.global.css';
import {PlaylistIcon} from "@vidstack/react/icons";
import {Button, Text} from "@mantine/core";
import {VideoPlayerType} from "@/types/Video/VideoPlayer.type";
import createHLSMasterPlaylist from "@/utils/Misc/createHLSMasterPlaylist";
import useCustomTheme from "@/hooks/useCustomTheme";

function changeEpisode({ player }: VideoPlayerType, episode: number) {
    const host = `https://${player.host}`;
    const source = player.list[episode].hls;

    return createHLSMasterPlaylist({ host, source });
}

export default function VideoPlayer({ title, player }: VideoPlayerType) {
    const { theme } = useCustomTheme();
    const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
    const { started, currentTime, duration } = useMediaStore(mediaPlayerRef);
    const [episodeSource, setEpisodeSource] = useState(changeEpisode({ player }, 1));
    const [hideMenu, setHideMenu] = useState('hidden');
    const [currentEpisode, setCurrentEpisode] = useState(1);

    const isLastTenSeconds = (duration - currentTime) <= 10;
    const episodesAmount = Object.entries(player.list);

    const episodesList = episodesAmount.map((_value, index) => {
            const episodeIndex = index + 1;
            const style =  currentEpisode === episodeIndex ?{
                color: '#fff',
                fontWeight: 600,
                textShadow: '0px 0px 4px black',
                background: theme.color,
            } : {
                color: '#fff',
                background: 'none',
            };

            return (
                <Menu.Radio
                    style={style}
                    key={episodeIndex}
                    onClick={
                        () => {
                            setCurrentEpisode(episodeIndex);
                            setEpisodeSource(changeEpisode({ player }, episodeIndex));
                        }
                    }
                >
                    Серия {episodeIndex}
                </Menu.Radio>);
        }
    );

    const episodesCount = episodesList.length;
    const hasNextEpisode = (episodesCount - currentEpisode) > 0;

    function setNextEpisode() {
        const nextEpisode = currentEpisode + 1;

        setCurrentEpisode(nextEpisode);
        setEpisodeSource(changeEpisode({ player }, nextEpisode));
    }

    return (
        <MediaPlayer
            onControlsChange={
                (isControlsShown) => {
                    if (!isControlsShown) {
                        setHideMenu('hidden');
                    } else {
                        setHideMenu('');
                    }
                }
            }
            className={classes.player}
            title={title ?? 'Anime title'}
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
    );
}
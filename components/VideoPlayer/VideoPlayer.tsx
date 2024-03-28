import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Menu } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { PlaylistIcon } from '@vidstack/react/icons';
import { useState } from 'react';
import russianTranslation from '../../configs/russianTranslation.json';
import classes from './VideoPlayer.module.css';

interface VideoPlayerProps {
    title?: string;
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    };
    preview?: string;
}
interface VideoPlaylistProps {
    fhd?: string;
    hd?: string;
    sd?: string;
}

function changeEpisode({ player }: VideoPlayerProps, episode: number) {
    const host = `https://${player.host}`;
    const source = player.list[episode].hls;

    const dataHLS: VideoPlaylistProps = {
        fhd: '#EXT-X-STREAM-INF:RESOLUTION=1920x1080\n',
        hd: '#EXT-X-STREAM-INF:RESOLUTION=1280x720\n',
        sd: '#EXT-X-STREAM-INF:RESOLUTION=720x480\n',
    };

    let playlistHLS = '';

    for (const [key, value] of Object.entries(source)) {
        if (value !== null) {
            // @ts-ignore
            playlistHLS = `${playlistHLS}\n${dataHLS[key]}${host}${value}`;
        }
    }

    const playlistSource = `#EXTM3U\n#EXT-X-VERSION:3\n${playlistHLS}`;

    const blob = new Blob([playlistSource], {
        type: 'application/x-mpegurl',
    });

    return URL.createObjectURL(blob);
}

export default function VideoPlayer({ title, player, preview }: VideoPlayerProps) {
    const [episodeSource, setEpisodeSource] = useState(changeEpisode({ player }, 1));

    const episodesAmount = Object.entries(player.list);

    const episodesList = episodesAmount.map((_value, index) => {
        const episodeIndex = index + 1;

        return (
            <Menu.Radio
              key={episodeIndex}
              onClick={() => {
                    setEpisodeSource(changeEpisode({ player }, episodeIndex));
                }
              }
            >
                Серия {episodeIndex}
            </Menu.Radio>);
        }
    );

    return (
        <div className={classes.wrapper}>
            <MediaPlayer
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
              poster={preview}
            >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} translations={russianTranslation}>
                    <Menu.Root className={`${classes.playlist} vds-menu`}>
                        <Menu.Button className={`${classes.playlistButton} vds - menu - button vds-button`} aria-label="Chapter Switch">
                            <PlaylistIcon className={classes.playlistIcon} />
                        </Menu.Button>
                        <Menu.Items className="vds-menu-items" placement="bottom start" offset={0}>
                            <Menu.RadioGroup>
                                {episodesList}
                            </Menu.RadioGroup>
                        </Menu.Items>
                    </Menu.Root>
                </DefaultVideoLayout>
            </MediaPlayer>
        </div>
    );
}

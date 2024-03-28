import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { Menu, MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { PlaylistIcon } from '@vidstack/react/icons';
import russianTranslation from '../../configs/russianTranslation.json';
import classes from './VideoPlayer.module.css';

interface VideoPlayerProps {
    player: {
        host: string;
        list: {
            id: {
                episode: string;
                uuid: string;
                hls: {
                    fhd?: string;
                    hd?: string;
                    sd?: string;
                }
            }
        }[]
    };
    preview: string;
}
interface VideoPlaylistProps {
    fhd?: string;
    hd?: string;
    sd?: string;
}

export default function VideoPlayer({ player, preview }: VideoPlayerProps) {
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

    const playlistSource = '#EXTM3U\n' +
        `#EXT-X-VERSION:3\n${
        playlistHLS}`;

    const blob = new Blob([playlistSource], {
        type: 'application/x-mpegurl',
    });

    const url = URL.createObjectURL(blob);

    return (
        <div className={classes.wrapper}>
            <MediaPlayer
              className={classes.player}
              title="1234"
              aspect-ratio={16 / 9}
              src={
                {
                    src: url,
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
                                <Menu.Radio key={1} value="123">Серия</Menu.Radio>
                                <Menu.Radio key={2} value="456">Серия</Menu.Radio>
                            </Menu.RadioGroup>
                        </Menu.Items>
                    </Menu.Root>
                </DefaultVideoLayout>
            </MediaPlayer>
        </div>
    );
}

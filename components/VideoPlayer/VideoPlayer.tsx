import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import styles from './VideoPlayer.module.css';
import russianTranslation from '../../configs/russianTranslation.json';

interface VideoPlayerProps {
    host: string;
    source: {
        fhd?: string;
        hd?: string;
        sd?: string;
    };
    preview: string;
}

interface VideoPlaylistProps {
    fhd?: string;
    hd?: string;
    sd?: string;
}

export default function VideoPlayer({ host, source, preview }: VideoPlayerProps) {
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
        <div className={styles.wrapper}>
            <MediaPlayer
              className={styles.player}
              title="1234"
              src={
                {
                    src: url,
                    type: 'application/x-mpegurl',
                }
              }
              viewType="video"
            >
                <MediaProvider>
                    <Poster src={preview} alt="Anime episode preview" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} translations={russianTranslation} />
            </MediaPlayer>
        </div>
    );
}

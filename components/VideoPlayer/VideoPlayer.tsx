import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
    source: {
        fhd?: string;
        hd?: string;
        sd?: string;
    };
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    const playlistSource = '#EXTM3U\n' +
        '#EXT-X-VERSION:3\n' +
        '\n' +
        '#EXT-X-STREAM-INF:RESOLUTION=720x480\n' +
        'https://cache.libria.fun/videos/media/ts/4217/1/480/c6889f9b0c1a9a4c7971925efe2dbfe5.m3u8\n' +
        '#EXT-X-STREAM-INF:RESOLUTION=1280x720\n' +
        'https://cache.libria.fun/videos/media/ts/4217/1/720/ca0fb100a3a8b41842cc4a062ad50520.m3u8';

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
                    type: 'application/x-mpegurl'
                }
              }
              viewType="video"
            >
                <MediaProvider>
                    <Poster src={preview} alt="Anime episode preview" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
        </div>
    );
}

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
    source: {
        fhd: string;
        hd: string;
        sd: string;
    };
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    return (
        <div className={styles.wrapper}>
            <MediaPlayer
              className={styles.player}
              title="1234"
              src="https://raw.githubusercontent.com/windstone-aristotle-yellow/Immensity/main/main.m3u8"
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

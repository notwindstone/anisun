import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {MediaPlayer, MediaProvider, Poster} from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
    source: string;
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    return (
        <div className={styles.wrapper}>
            <MediaPlayer
              className={styles.player}
              title={source}
              src={source}
              viewType="video"
            >
                <MediaProvider>
                    <Poster src={preview} alt="Anime episode preview" />
                </MediaProvider>
                <DefaultVideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" icons={defaultLayoutIcons} />
            </MediaPlayer>
        </div>
    );
}

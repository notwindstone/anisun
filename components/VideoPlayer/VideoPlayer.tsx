import '@vidstack/react/player/styles/default/theme.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { PlayIcon } from '@vidstack/react/icons';

interface VideoPlayerProps {
    source: string;
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    return (
        <>
            <MediaPlayer
              title={source}
              src={source}
            >
                <MediaProvider>
                    <Poster
                      className="vds-poster"
                      src={preview}
                      alt="Anime episode poster"
                    />
                    <PlayIcon size={40} />
                </MediaProvider>
            </MediaPlayer>
        </>
    );
}

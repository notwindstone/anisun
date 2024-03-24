import '@vidstack/react/player/styles/default/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';

interface VideoPlayerProps {
    source: string;
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {

    return (
        <>
            <MediaPlayer title="Sprite Fight" src="https://cache.libria.fun/videos/media/ts/9000/1/1080/7f3c1729ebd24b93d4e0918510004606.m3u8">
                <MediaProvider />
            </MediaPlayer>
        </>
    );
}

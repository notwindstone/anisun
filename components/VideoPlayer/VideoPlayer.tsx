import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
    source: string;
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video: any = videoRef.current;
        if (!video) return;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // This will run in safari, where HLS is supported natively
            video.src = source;
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
        } else {
            console.error(
                'This is an old browser that does not support MSE https://developer.mozilla.org/docs/Web/API/Media_Source_Extensions_API',
            );
        }
    }, [source, videoRef]);

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              width="100%"
              ref={videoRef}
              poster={preview}
            />
        </>
    );
}

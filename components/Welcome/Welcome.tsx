import { Text } from '@mantine/core';
import React, {useEffect, useRef} from 'react';

export async function Welcome() {
    const res = await fetch('https://api.anilibria.tv/v3/genres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    const getRandomTitle = await fetch('https://api.anilibria.tv/v3/title/random');
    const randomTitle = await getRandomTitle.json();
    console.log(randomTitle.player.list[1].hls.fhd);

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.controls = true;
        const defaultOptions = {};
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // This will run in safari, where HLS is supported natively
            video.src = src;
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers

            const hls = new Hls();
            hls.loadSource(src);
            const player = new Plyr(video, defaultOptions);
            hls.attachMedia(video);
        } else {
            console.error(
                'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
            );
        }
    }, [src, videoRef]);

    return (
        <>
            {genres}
            <video data-displaymaxtap ref={videoRef}/>
            <style jsx>{`
                video {
                    max-width: 100%;
                }
            `}</style>
        </>
    );
}

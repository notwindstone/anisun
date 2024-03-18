import { Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export async function Welcome() {
    const res = await fetch('https://api.anilibria.tv/v3/genres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    const getRandomTitle = await fetch('https://api.anilibria.tv/v3/title/random');
    const randomTitle = await getRandomTitle.json();
    console.log(randomTitle.player.list[1].hls.fhd);

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasWindow(true);
        }
    }, []);

    return (
        <>
            {genres}
            {
                hasWindow && <ReactPlayer
                  src="https://www.youtube.com/watch?v=zohpogt56Bg"
                  width="100%"
                  height="100%"
                  className={s.player} />
            }
        </>
    );
}

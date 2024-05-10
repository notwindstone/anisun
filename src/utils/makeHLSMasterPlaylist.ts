import {VideoPlaylistType} from "@/types/VideoPlaylistType";

export default function makeHLSMasterPlaylist({ host, source }: { host: string, source: VideoPlaylistType }) {
    const dataHLS: VideoPlaylistType = {
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

    const playlistSource = `#EXTM3U\n#EXT-X-VERSION:3\n${playlistHLS}`;

    const blob = new Blob([playlistSource], {
        type: 'application/x-mpegurl',
    });

    return URL.createObjectURL(blob);
}
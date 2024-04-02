import {getHost} from "@/api/anilibria/getHost";

const host = getHost.api()

export const getTitle = {
    id: async function (id: number) {
        return `${host}title?id=${id}`
    },
    code: async function (code: string) {
        return `${host}title?code=${code}`
    },
    torrent_id: async function (torrent_id: string) {
        return `${host}title?torrent_id=${torrent_id}`
    },
    filter: async function (filter: string) {
        return `${host}title?filter=${filter}`
    },
    remove: async function (remove: string) {
        return `${host}title?remove=${remove}`
    },
    include: async function (include: string) {
        return `${host}title?include=${include}`
    },
    description_type: async function (description_type: string) {
        return `${host}title?description_type=${description_type}`
    },
    playlist_type: async function (playlist_type: string) {
        return `${host}title?playlist_type=${playlist_type}`
    },
}
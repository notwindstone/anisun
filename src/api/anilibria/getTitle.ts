import {getHost} from "@/api/anilibria/getHost";
import axios from "axios";

const host = getHost.api()

export const getTitle = {
    id: async function (id: number) {
        return await axios.get(`${host}title?id=${id}`)
    },
    code: async function (code: string) {
        return await axios.get(`${host}title?code=${code}`)
    },
    torrent_id: async function (torrent_id: string) {
        return await axios.get(`${host}title?torrent_id=${torrent_id}`)
    },
    filter: async function (filter: string) {
        return await axios.get(`${host}title?filter=${filter}`)
    },
    remove: async function (remove: string) {
        return await axios.get(`${host}title?remove=${remove}`)
    },
    include: async function (include: string) {
        return await axios.get(`${host}title?include=${include}`)
    },
    description_type: async function (description_type: string) {
        return await axios.get(`${host}title?description_type=${description_type}`)
    },
    playlist_type: async function (playlist_type: string) {
        return await axios.get(`${host}title?playlist_type=${playlist_type}`)
    },
}
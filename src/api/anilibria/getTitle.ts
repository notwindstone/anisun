import {getHost} from "@/api/anilibria/getHost";
import axios from "axios";

const host = getHost.api()

export const getTitle = {
    id: async function (id: number) {
        return (await axios.get(`${host}title?id=${id}`)).data
    },
    code: async function (code: string) {
        return (await axios.get(`${host}title?code=${code}`)).data
    },
    torrent_id: async function (torrent_id: string) {
        return (await axios.get(`${host}title?torrent_id=${torrent_id}`)).data
    },
    filter: async function (filter: string) {
        return (await axios.get(`${host}title?filter=${filter}`)).data
    },
    remove: async function (remove: string) {
        return (await axios.get(`${host}title?remove=${remove}`)).data
    },
    include: async function (include: string) {
        return (await axios.get(`${host}title?include=${include}`)).data
    },
    description_type: async function (description_type: string) {
        return (await axios.get(`${host}title?description_type=${description_type}`)).data
    },
    playlist_type: async function (playlist_type: string) {
        return (await axios.get(`${host}title?playlist_type=${playlist_type}`)).data
    },
}
import axios from "axios";
import { host } from "@/lib/anilibria/functions/host";

const anilibriaHost = host.api()

export const title = {
    id: async function (id: number) {
        return (await axios.get(`${anilibriaHost}title?id=${id}`)).data
    },
    code: async function (code: string) {
        return (await axios.get(`${anilibriaHost}title?code=${code}`)).data
    },
    torrent_id: async function (torrent_id: string[]) {
        return (await axios.get(`${anilibriaHost}title?torrent_id=${torrent_id}`)).data
    },
    filter: async function (filter: string[]) {
        return (await axios.get(`${anilibriaHost}title?filter=${filter}`)).data
    },
    remove: async function (remove: string[]) {
        return (await axios.get(`${anilibriaHost}title?remove=${remove}`)).data
    },
    include: async function (include: string[]) {
        return (await axios.get(`${anilibriaHost}title?include=${include}`)).data
    },
    description_type: async function (description_type: string) {
        return (await axios.get(`${anilibriaHost}title?description_type=${description_type}`)).data
    },
    playlist_type: async function (playlist_type: string) {
        return (await axios.get(`${anilibriaHost}title?playlist_type=${playlist_type}`)).data
    },
}
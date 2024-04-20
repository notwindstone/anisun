import axios from "axios";
import {host} from "@/lib/anilibria/functions/host";

const anilibriaHost = host.api()

export const search = async ({ title, year }: { title: string | null, year: string | undefined }) => {
    return (await axios.get(`${anilibriaHost}title/search?search=${title}&year=${year}`)).data.list[0]
}
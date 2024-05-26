import axios from "axios";

const sovetromantica_host = 'https://service.sovetromantica.com/v1/';

export const episodes = async ({ id }: { id: number }) => {
    return (await axios.get(`${sovetromantica_host}/anime/${id}/episodes`));
};
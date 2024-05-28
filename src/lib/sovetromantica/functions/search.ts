import axios from "axios";

const sovetromantica_host = 'https://service.sovetromantica.com/v1/';

export const search = async ({ name }: { name: string }) => {
    return (await axios.get(`${sovetromantica_host}animesearch?anime_name=${name}`)).data;
};
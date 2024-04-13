import axios from "axios";

export const code = async (code: string) => {
    return (await axios.get(`https://kodikapi.com/search?token=${process.env.KODIK_TOKEN!}&title_orig=${code}&strict`)).data
}
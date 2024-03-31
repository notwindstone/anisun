import {getComments} from "@/api/comments/getComments";

export default async function Home() {
    const data = await getComments();
    return <>Test</>
}
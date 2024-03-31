import {getComments} from "@/api/comments/getComments";
import Comments from "@/components/Comments/Comments";

export default async function Home() {
    const data = await getComments();
    return <Comments comments={data} />
}
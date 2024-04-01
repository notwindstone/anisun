import {getComments} from "@/api/comments/getComments";
import Link from "next/link";

export default async function Home() {
    const data = await getComments();
    return <Link href="/titles">Test</Link>
}
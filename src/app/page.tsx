import {getComments} from "@/api/comments/getComments";
import Link from "next/link";

export default async function Home() {
    const data = await getComments();
    return <Link href="https://primersoch.ru/itogovoesoch/itogovoeprimer/91-itogovoe-sochinenie-na-temu-chto-obedinjaet-ljudej-v-gody-vojny.html">Test</Link>
}
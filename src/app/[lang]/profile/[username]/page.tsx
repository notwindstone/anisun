import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "sadf",
};

export default async function Page({
    params,
}: {
    params: Promise<{ username: string }>
}) {
    const { username } = await params;

    return (
        <div>
            {username}
            <Link href={"/"}>home</Link>
        </div>
    );
}
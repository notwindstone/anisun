import Link from "next/link";

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
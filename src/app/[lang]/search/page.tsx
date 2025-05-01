import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex items-center p-4 gap-4">
            <Link href={"/"}>
                home
            </Link>
        </div>
    );
}

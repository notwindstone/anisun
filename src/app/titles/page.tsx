import Link from 'next/link';
import {Search} from "@/components/Search/Search";

export default async function Page() {
    return (
        <div>
            <Link href="/">Return</Link>
            <Search />
        </div>
    );
}
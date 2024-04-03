import Link from "next/link";
import Comments from "@/components/Comments/Comments";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export default async function Home() {
    return (
        <>
            <Link href="/titles">Test</Link>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </>
    )
}
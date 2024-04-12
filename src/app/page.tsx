import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

export default async function Home() {
    return (
        <>
            <Link href="/titles">Test</Link>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link href="/sign-in">Войти в аккаунт</Link>
            </SignedOut>
        </>
    )
}
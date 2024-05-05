import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, UserProfile} from "@clerk/nextjs";
import {HeroContent} from "@/components/HeroContent/HeroContent";

export default async function Home() {
    return (
        <div>
            <HeroContent />
            <Link href="/titles">Test</Link>
            <SignedIn>
                <SignInButton />
                <SignUpButton />
                <SignOutButton />
                <UserProfile />
            </SignedIn>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
                <SignOutButton />
                <Link href="/sign-in">Войти в аккаунт</Link>
            </SignedOut>
        </div>
    )
}
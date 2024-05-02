import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {HeroContent} from "@/components/HeroContent/HeroContent";
import AnimeTitleList from "@/components/AnimeTitle/AnimeTitleList/AnimeTitleList";
import FetchingIntersection from "@/components/FetchingIntersection/FetchingIntersection";

export default async function Home() {
    return (
        <div>
            <HeroContent />
            <Link href="/titles">Test</Link>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link href="/sign-in">Войти в аккаунт</Link>
            </SignedOut>
            <FetchingIntersection />
        </div>
    )
}
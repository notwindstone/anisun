import Link from "next/link";
import {HeroContent} from "@/components/HeroContent/HeroContent";

export default async function Home() {
    return (
        <div>
            <HeroContent />
            <Link href="/titles">Test</Link>
        </div>
    )
}
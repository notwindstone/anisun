import HeroCard from "@/components/Hero/HeroCard/HeroCard";

export default function Hero() {
    return (
        <>
            <div className="relative w-full h-full aspect-video">
                <HeroCard provider={"shikimori"} />
            </div>
        </>
    );
}
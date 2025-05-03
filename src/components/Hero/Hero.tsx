import ServerFetch from "@/components/Hero/ServerFetch/ServerFetch";

export default function Hero() {
    return (
        <>
            <div className="group relative overflow-clip w-full h-full aspect-video">
                <ServerFetch />
            </div>
        </>
    );
}
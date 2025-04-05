import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <ColorSchemeChanger />
            <Link href={"/profile/1234"}>profile</Link>
        </div>
    );
}

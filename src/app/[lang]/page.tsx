import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

export default async function Home() {
    return (
        <div>
            <ColorSchemeChanger />
            <Link href={"/profile/1234"}>
                profile
            </Link>
            <LocaleSwitcher />
        </div>
    );
}

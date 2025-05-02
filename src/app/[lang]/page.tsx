import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import PaletteChanger from "@/components/Theme/PaletteChanger/PaletteChanger";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import LayoutChanger from "@/components/LayoutChanger/LayoutChanger";

export default async function Home() {
    return (
        <div className="flex items-center p-4 gap-4">
            <ColorSchemeChanger />
            <Link href={"/profile/1234"}>
                profile
            </Link>
            <LocaleSwitcher />
            <PaletteChanger
                colors={BaseColors}
                propertyKey="base"
            />
            <PaletteChanger
                colors={AccentColors}
                propertyKey="accent"
            />
            <LayoutChanger />
        </div>
    );
}

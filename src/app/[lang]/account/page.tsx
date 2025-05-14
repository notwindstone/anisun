import Link from "next/link";
import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import PaletteChanger from "@/components/Theme/PaletteChanger/PaletteChanger";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import OAuth2Links from "@/components/OAuth2Links/OAuth2Links";

export default async function Page() {
    return (
        <div className="flex flex-col pt-12 pb-4 px-4 gap-4">
            <p className="text-2xl font-medium leading-none">
                Account
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Manage your
            </p>
            <OAuth2Links />
            <Link href={"/"}>
                Settings
            </Link>
            <LocaleSwitcher />
            <ColorSchemeChanger />
            <PaletteChanger
                colors={AccentColors}
                propertyKey={"accent"}
            />
            <PaletteChanger
                colors={BaseColors}
                propertyKey={"base"}
            />
        </div>
    );
}

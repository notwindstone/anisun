import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import PaletteChanger from "@/components/Theme/PaletteChanger/PaletteChanger";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import OAuth2Links from "@/components/OAuth2Links/OAuth2Links";
import LayoutChanger from "@/components/LayoutChanger/LayoutChanger";
import Divider from "@/components/Divider/Divider";

export default async function Page() {
    return (
        <div className="flex flex-col pb-4 px-4 gap-4">
            <p className="text-2xl font-medium leading-none pt-8">
                Account
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Sign in using your favourite anime social website
            </p>
            <Divider />
            <OAuth2Links />
            <p className="text-2xl font-medium leading-none pt-8">
                Settings
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Manage your settings
            </p>
            <Divider />
            <LayoutChanger />
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

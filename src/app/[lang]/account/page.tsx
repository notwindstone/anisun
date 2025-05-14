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
            <p className="text-lg leading-none pt-2">
                Select your language
            </p>
            <div className="flex flex-wrap gap-2">
                <LocaleSwitcher />
            </div>
            <p className="text-lg leading-none pt-2">
                Select accent color
            </p>
            <div className="flex flex-wrap gap-2">
                <PaletteChanger
                    colors={AccentColors}
                    propertyKey={"accent"}
                />
            </div>
            <p className="text-lg leading-none pt-2">
                Select layout color
            </p>
            <div className="flex flex-wrap gap-2">
                <PaletteChanger
                    colors={BaseColors}
                    propertyKey={"base"}
                />
                <ColorSchemeChanger />
                <LayoutChanger />
            </div>
        </div>
    );
}

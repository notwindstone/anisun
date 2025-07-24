import { Metadata } from "next";
import Divider from "@/components/base/Divider/Divider";
import ExtensionsLoader from "@/components/extensions/ExtensionsLoader/ExtensionsLoader";

export const metadata: Metadata = {
    title: "Extensions",
};

export default function Page() {
    return (
        <div className="flex flex-col pb-4 px-4 gap-4 mx-auto max-w-384">
            <p className="text-2xl font-medium leading-none pt-8">
                Extensions<span className="pl-1 opacity-60 text-sm align-top">βeta</span>
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Explore various plugins that extend website functionality
            </p>
            <Divider />
            <ExtensionsLoader />
        </div>
    );
}

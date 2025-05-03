import { AppName } from "@/constants/app";
import Favicon from "@/components/Favicon/Favicon";

export default function Footer() {
    return (
        <>
            <div className="px-4 flex flex-col gap-4">
                <div className="flex flex-nowrap gap-4">
                    <Favicon />
                    <div>
                        {AppName}
                    </div>
                </div>
            </div>
        </>
    );
}
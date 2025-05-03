import favicon from "@/../public/favicon-x128.jpg";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";

export default function Favicon() {
    return (
        <div className="select-none w-10 h-10 rounded-md bg-[#7993d0] ring-2 ring-black dark:ring-white drop-shadow-md overflow-clip relative">
            <ConfiguredImage
                className="w-10 h-10 transition"
                src={favicon}
                alt={"Tenshi Hinanawi, a character from Touhou"}
            />
        </div>
    );
}
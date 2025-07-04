import favicon from "@/../public/favicon-x256.webp";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";

export default function Favicon() {
    return (
        <div className="select-none w-10 h-10 rounded-md bg-white ring-2 ring-black dark:ring-white drop-shadow-md overflow-clip relative">
            <ConfiguredImage
                className="w-10 h-10 transition"
                src={favicon}
                alt={"Arisu Sakayanagi, a character from Classroom of the Elite"}
            />
        </div>
    );
}

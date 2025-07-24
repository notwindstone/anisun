import { useState } from "react";

export default function SearchTagButton({
    name,
    description,
    callback,
    unselectedColor,
    selected,
}: {
    name:            string;
    description:     string;
    callback:        (tagName: string) => void;
    unselectedColor: string;
    selected:        Set<string>;
}) {
    const [active, setActive] = useState(selected.has(name));

    return (
        <button
            data-description={description}
            className={`transition-[background-color] ${active ? "dark:!bg-black !bg-white" : ""} dark:text-neutral-400 text-neutral-600 px-2 py-1 text-sm rounded-md cursor-pointer sm:hover:before:opacity-100 sm:before:block before:hidden sm:before:transition-[opacity] sm:before:duration-150 sm:before:text-start sm:before:text-balance sm:before:text-white sm:before:bg-black sm:before:px-2 sm:before:py-1 sm:before:rounded-md sm:before:bottom-0 sm:before:left-0 sm:before:w-48 sm:before:pointer-events-none sm:before:opacity-0 sm:before:absolute sm:before:content-[attr(data-description)] sm:before:z-1000`}
            onClick={() => {
                setActive((state) => !state);
                callback(name);
            }}
            style={{
                backgroundColor: unselectedColor,
            }}
        >
            {name}
        </button>
    );
}

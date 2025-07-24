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
            className={`${active ? "dark:!bg-black !bg-white " : ""}search-tag-button`}
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

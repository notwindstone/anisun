import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FiltersCategory({
    children,
    label,
    visualOnly,
}: {
    children:    React.ReactNode;
    label:       string;
    /** hide element using CSS instead of react */
    visualOnly?: boolean;
}) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative flex flex-col gap-4">
            <button
                className="flex flex-nowrap items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-[opacity] font-medium"
                onClick={() => setShow((state) => !state)}
            >
                <ChevronRight
                    size={20}
                    className={`transition-[rotate] ${show ? "rotate-90" : "rotate-0"}`}
                />
                <span>
                    {label}
                </span>
            </button>
            {
                visualOnly ? (
                    <div className={`flex-col gap-4 ${show ? "flex" : "hidden"}`}>
                        {children}
                    </div>
                ) : (
                    show && (
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    )
                )
            }
        </div>
    );
}

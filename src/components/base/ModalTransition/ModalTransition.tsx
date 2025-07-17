import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import Button from "@/components/base/Button/Button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ModalTransition({
    children,
    hide,
}: {
    children: React.ReactNode;
    hide:     () => void;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:  value.data.colors.base,
            theme: value.data.theme,
        };
    });
    const [classNames, setClassNames] = useState<{
        darken: string;
        modal:  string;
    }>({
        darken: "opacity-0",
        modal:  "invisible opacity-0 translate-y-4",
    });

    useEffect(() => {
        setTimeout(() => {
            setClassNames({
                darken: "opacity-100",
                modal:  "visible opacity-100 translate-y-0",
            });
            // for transition
        }, 10);
    }, []);

    return (
        <>
            <div className={`sm:hidden absolute top-0 bottom-0 right-0 left-0 bg-[theme(colors.white/.7)] dark:bg-[theme(colors.black/.7)] transition duration-300 z-1000 ${classNames.darken}`} />
            <div
                className={`absolute sm:top-12 sm:right-0 sm:left-auto sm:bottom-auto sm:w-fit rounded-md sm:h-auto top-4 right-4 left-4 bottom-4 w-auto z-1000 transition duration-300 ease-out ${classNames.modal} sm:p-0`}
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 100,
                    }),
                }}
            >
                <div className="flex flex-col">
                    <Button
                        custom={{
                            style: "base",
                        }}
                        label="Hide Modal"
                        onClick={hide}
                    >
                        <X />
                    </Button>
                    {children}
                </div>
            </div>
        </>
    );
}

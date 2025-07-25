import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import React, { createRef, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";

export default function SegmentedControl({
    darker,
    fullWidth,
    list,
    selected,
    selectList,
}: {
    darker?:    boolean;
    fullWidth?: boolean;
    list:       Array<string>;
    selected:   string | undefined;
    selectList: Dispatch<SetStateAction<string | undefined>>;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const references= useMemo(
        () => Array.from({ length: list.length }).map(() => createRef<HTMLButtonElement>()),
        [list],
    );
    const [currentButtonWidth, setCurrentButtonWidth] = useState<{
        width:  number;
        offset: {
            left: number;
            top:  number;
        };
    }>({
        width:  0,
        offset: {
            left: 0,
            top:  0,
        },
    });
    const [dynamicTransitionClassName, setDynamicTransitionClassName] = useState<"duration-0" | "transition-segmented-control duration-300">("duration-0");

    useEffect(() => {
        const filteredReference = references.find((reference) => reference.current?.textContent === selected);

        setCurrentButtonWidth({
            width:  Number(filteredReference?.current?.clientWidth || 0),
            offset: {
                left: Number(filteredReference?.current?.offsetLeft || 0) - 4,
                top:  Number(filteredReference?.current?.offsetTop || 0) - 4,
            },
        });

        // don't show transitions on initial render
        if (dynamicTransitionClassName === "transition-segmented-control duration-300") {
            return;
        }

        if (currentButtonWidth.width === 0) {
            return;
        }

        setDynamicTransitionClassName("transition-segmented-control duration-300");
    }, [references, currentButtonWidth.width, dynamicTransitionClassName, selected]);

    return (
        <>
            <div className="flex gap-2 shrink-0 flex-wrap">
                <div
                    className={`${fullWidth ? "w-full" : "w-fit"} relative rounded-md flex gap-2 p-1 overflow-hidden shrink-0 flex-wrap`}
                    style={{
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? (darker ? 800 : 900) : (darker ? 200 : 100),
                        }),
                    }}
                >
                    <span
                        className={`absolute h-8 rounded-md ${dynamicTransitionClassName}`}
                        style={{
                            backgroundColor: parseTailwindColor({
                                color: base,
                                step:  theme === DarkThemeKey
                                    ? (darker ? 900 : 800) : (darker ? 100 : 200),
                            }),
                            width:     currentButtonWidth?.width ?? 0,
                            transform: `translateX(${currentButtonWidth?.offset?.left ?? 0}px) translateY(${currentButtonWidth?.offset?.top ?? 0}px)`,
                        }}
                    />
                    {
                        list.map((mediaListStatus, index) => {
                            return (
                                <React.Fragment key={mediaListStatus}>
                                    {
                                        index > 0 && (

                                            <div
                                                className="h-8 w-[1px]"
                                                style={{
                                                    backgroundColor: parseTailwindColor({
                                                        color: base,
                                                        step:  theme === DarkThemeKey
                                                            ? 800 : 200,
                                                    }),
                                                }}
                                            />
                                        )
                                    }
                                    <button
                                        ref={references[index]}
                                        onClick={() => selectList(mediaListStatus)}
                                        className={`z-10 flex rounded-md py-1 px-2 h-8 cursor-pointer transition-[opacity] duration-300 opacity-80 hover:opacity-100 ${fullWidth ? "flex-1 justify-center" : ""}`}
                                    >
                                        {mediaListStatus}
                                    </button>
                                </React.Fragment>

                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

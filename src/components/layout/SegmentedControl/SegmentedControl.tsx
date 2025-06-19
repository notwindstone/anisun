import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function SegmentedControl({
    list,
    selectList,
}: {
    list: Array<string>;
    selectList: Dispatch<SetStateAction<string | undefined>>;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const [currentButtonWidth, setCurrentButtonWidth] = useState<{
        width:  number;
        offset: {
            left: number;
            top:  number;
        };
    }>();

    return (
        <>
            <div className="flex gap-2 shrink-0 flex-wrap">
                <div
                    className="w-fit relative rounded-md flex gap-2 p-1 overflow-hidden shrink-0 flex-wrap"
                    style={{
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 900 : 100,
                        }),
                    }}
                >
                    <span
                        className="transition-segmented-control duration-300 absolute h-8 rounded-md"
                        style={{
                            backgroundColor: parseTailwindColor({
                                color: base,
                                step:  theme === DarkThemeKey
                                    ? 800 : 200,
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
                                        onClick={(event) => {
                                            setCurrentButtonWidth({
                                                width:  event.currentTarget.clientWidth,
                                                offset: {
                                                    left: event.currentTarget.offsetLeft - 4,
                                                    top:  event.currentTarget.offsetTop - 4,
                                                },
                                            });
                                            selectList(mediaListStatus);
                                        }}
                                        className="z-10 flex rounded-md py-1 px-2 h-8 cursor-pointer transition-[opacity] duration-300 opacity-80 hover:opacity-100"
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

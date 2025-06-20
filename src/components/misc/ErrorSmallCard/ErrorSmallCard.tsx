const placeholderArray = [ "w-18", "w-8" ];
const placeholderNamesArray = [ "min-w-28", "w-20" ];

export default function ErrorSmallCard({
    isGrid,
}: {
    isGrid?: boolean;
}) {
    const gridClassNames = isGrid ? "w-full flex-max-w-1/2 xs:flex-max-w-1/3 lg:flex-max-w-1/4 xl:flex-max-w-1/6" : "";

    return (
        <>
            <div className={`shrink-0 relative aspect-poster rounded-md overflow-clip ${gridClassNames}`}>
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 gap-2">
                    <div className="flex flex-wrap justify-between gap-1 w-full">
                        {
                            placeholderArray.map((widthClassName, index) => {
                                return (
                                    <div
                                        className={`text-black dark:text-white text-xs flex px-1 items-center bg-[theme(colors.red.500/.10)] dark:bg-[theme(colors.red.400/.10)] rounded-md h-5 ${widthClassName}`}
                                        key={`${widthClassName}_${index}`}
                                    >
                                        {index === 0 ? "Error..." : ""}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            placeholderNamesArray.map((widthClassName, index) => {
                                return (
                                    <div
                                        key={`${widthClassName}_${index}`}
                                        className={`bg-[theme(colors.red.500/.10)] dark:bg-[theme(colors.red.400/.10)] rounded-md ${widthClassName} min-h-5 text-xs flex items-center px-1`}
                                    >
                                        {
                                            index === 0
                                                ? "Maybe waiting will help you."
                                                : ""
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

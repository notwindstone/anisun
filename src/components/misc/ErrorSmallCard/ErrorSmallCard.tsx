export default function ErrorSmallCard({
    isGrid,
}: {
    isGrid?: boolean;
}) {
    const gridClassNames = isGrid ? "w-full flex-max-w-1/2 xs:flex-max-w-1/3 lg:flex-max-w-1/4 xl:flex-max-w-1/6" : "";

    return (
        <>
            <div className={`shrink-0 relative aspect-poster rounded-md overflow-clip border-2 border-[#0002] dark:border-[#fff2] ${gridClassNames}`}>
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 gap-2">
                    <div className="flex flex-col gap-1">
                        Something went wrong...
                    </div>
                </div>
            </div>
        </>
    );
}
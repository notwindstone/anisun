export default function ErrorSmallCard() {
    return (
        <>
            <div className="shrink-0 relative aspect-poster rounded-md overflow-clip w-32 border-[1px] border-[#0004] dark:border-[#fff4]">
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 gap-2">
                    <div className="flex flex-col gap-1">
                        Something went wrong...
                    </div>
                </div>
            </div>
        </>
    );
}
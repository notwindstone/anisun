export default function ScrollableCards({
    children,
    gradientColorOne,
    gradientColorTwo,
}: {
    children: React.ReactNode;
    gradientColorOne: string;
    gradientColorTwo: string;
}) {
    return (
        <div className="relative flex flex-nowrap w-full h-72 sm:h-96 lg:h-[448px]">
            <div className="p-4 flex flex-nowrap gap-4 w-full overflow-x-auto overflow-y-hidden scrollbar-hidden h-full">
                {children}
            </div>
            <div
                className="absolute left-0 w-4 h-full z-10"
                style={{
                    backgroundImage: `linear-gradient(
                        to right,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
            <div
                className="absolute right-0 w-4 h-full z-10"
                style={{
                    backgroundImage: `linear-gradient(
                        to left,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
        </div>
    );
}
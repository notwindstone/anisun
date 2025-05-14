import { useCallback, useRef, useState } from "react";

export default function ScrollableCards({
    children,
    gradientColorOne,
    gradientColorTwo,
}: {
    children: React.ReactNode;
    gradientColorOne: string;
    gradientColorTwo: string;
}) {
    const containerReference = useRef<HTMLDivElement>(null);
    const [isDragged, setDragged] = useState(false);

    const handleMouseDown = useCallback((event: React.MouseEvent) => {
        event.preventDefault();

        const element = containerReference.current;

        if (!element) {
            return;
        }

        const startPos = {
            left: element.scrollLeft,
            top: element.scrollTop,
            x: event.clientX,
            y: event.clientY,
        };

        const handleMouseMove = (mouseMoveEvent: React.MouseEvent | Event) => {
            if (!(mouseMoveEvent instanceof MouseEvent)) {
                return;
            }

            if (!isDragged) {
                setDragged(true);
            }

            const dx = mouseMoveEvent.clientX - startPos.x;
            const dy = mouseMoveEvent.clientY - startPos.y;
            element.scrollTop = startPos.top - dy;
            element.scrollLeft = startPos.left - dx;
        };

        const handleMouseUp = () => {
            setDragged(false);

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [isDragged]);

    return (
        <>
            <div
                className="relative flex flex-nowrap w-full h-72 sm:h-96 lg:h-[448px]"
            >
                <div
                    className={`p-4 flex flex-nowrap gap-4 w-full overflow-x-auto overflow-y-hidden scrollbar-hidden h-full transition ${isDragged ? "pointer-events-none" : ""}`}
                    ref={containerReference}
                    // doesn't fire on mobile screens, which is good
                    onMouseDown={handleMouseDown}
                >
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
        </>
    );
}
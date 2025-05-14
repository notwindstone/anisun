import { useCallback, useRef, useState } from "react";

const momentumVelocity = 0.95;

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

        // momentum
        let velocityX = 0;
        let momentumID: number;

        const element = containerReference.current;

        if (!element) {
            return;
        }

        const scrollLeft = element.scrollLeft;
        const startPos = {
            left: element.scrollLeft,
            x: event.clientX,
        };

        // typescript is going nuts here if i specify only React.MouseEvent
        const handleMouseMove = (mouseMoveEvent: React.MouseEvent | Event) => {
            // typescript sometimes can be ridiculous, but i still love it <3
            if (!(mouseMoveEvent instanceof MouseEvent)) {
                return;
            }

            // don't fire <Link /> click event only when dragging is involved
            if (!isDragged) {
                setDragged(true);
            }

            const dx = mouseMoveEvent.clientX - startPos.x;
            const previousScrollLeft = element.scrollLeft;

            element.scrollLeft = startPos.left - dx;
            velocityX = scrollLeft - dx - previousScrollLeft;
        };

        const handleMouseUp = () => {
            setDragged(false);
            beginMomentumTracking();

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }

        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }

        function momentumLoop() {
            if (!element) {
                return;
            }

            element.scrollLeft += velocityX;
            velocityX *= momentumVelocity;

            if (Math.abs(velocityX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }
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
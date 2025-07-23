export function getNextSeason(monthNumber?: number) {
    const currentMonth = monthNumber === undefined
        ? (new Date).getMonth()
        : monthNumber - 1;
    let nextSeason: "SUMMER" | "SPRING" | "FALL" | "WINTER";

    switch (currentMonth) {
        case 11:
        case 0:
        case 1: {
            nextSeason = "SPRING";

            break;
        }
        case 2:
        case 3:
        case 4: {
            nextSeason = "SUMMER";

            break;
        }
        case 5:
        case 6:
        case 7: {
            nextSeason = "FALL";

            break;
        }
        default: {
            nextSeason = "WINTER";

            break;
        }
    }

    return nextSeason;
}
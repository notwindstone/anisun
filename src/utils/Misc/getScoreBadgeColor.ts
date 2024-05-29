export function getScoreBadgeColor({ score }: { score?: number | null } ) {
    if (!score) {
        return "black";
    }

    if (score > 7.5) {
        return "green";
    }

    if (score > 5.5) {
        return "yellow";
    }

    return "#ff0000";
}

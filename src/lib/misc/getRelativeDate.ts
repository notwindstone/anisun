export function getRelativeDate({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    from = new Date(),
}: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    from?: Date;
}): Date {
    const relativeDate = new Date(from);

    relativeDate.setTime(
        relativeDate.getTime() +
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000 +
        milliseconds,
    );

    return relativeDate;
}
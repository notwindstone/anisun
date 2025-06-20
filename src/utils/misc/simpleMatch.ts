export default function simpleMatch(stringFirst: string, stringSecond: string): boolean {
    const lengthFirst = stringFirst.length;
    const lengthSecond = stringSecond.length;
    let occurrencesFirst = 0;
    let occurrencesSecond = 0;

    let indexFirst = 0;
    let indexSecond = 0;

    while (Math.max(indexFirst, indexSecond) < Math.min(lengthFirst, lengthSecond)) {
        const charFirst = stringFirst[indexFirst];
        const charSecond = stringSecond[indexSecond];

        if (charFirst === charSecond) {
            indexFirst++;
            indexSecond++;
            occurrencesFirst++;

            continue;
        }

        indexFirst++;
    }

    indexFirst = 0;
    indexSecond = 0;

    while (Math.max(indexFirst, indexSecond) < Math.min(lengthFirst, lengthSecond)) {
        const charFirst = stringFirst[indexFirst];
        const charSecond = stringSecond[indexSecond];

        if (charFirst === charSecond) {
            indexFirst++;
            indexSecond++;
            occurrencesSecond++;

            continue;
        }

        indexSecond++;
    }

    return (
        Math.floor(
            (occurrencesFirst / Math.min(lengthFirst, lengthSecond)) * 100,
        ) >= 80 ||
        Math.floor(
            (occurrencesSecond / Math.min(lengthFirst, lengthSecond)) * 100,
        ) >= 80
    );
}

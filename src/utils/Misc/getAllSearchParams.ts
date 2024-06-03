import {ReadonlyURLSearchParams} from "next/navigation";

function splitStringToArray(toSplit: string[]) {
    return toSplit?.[0]?.split(',') ?? [];
}

export default function getAllSearchParams(searchParams: ReadonlyURLSearchParams) {
    const censored = searchParams.get('censored');
    const durations = splitStringToArray(searchParams.getAll('durations'));
    const demographicGenres = splitStringToArray(searchParams.getAll('demographicGenres'));
    const genreGenres = splitStringToArray(searchParams.getAll('genreGenres'));
    const themeGenres = splitStringToArray(searchParams.getAll('themeGenres'));
    const kinds = splitStringToArray(searchParams.getAll('kinds'));
    const limit = parseInt(searchParams.get('limit') || '20');
    const order = searchParams.get('order');
    const ratings = splitStringToArray(searchParams.getAll('ratings'));
    const score = parseInt(searchParams.get('score') || '7');

    const currentYear = new Date().getFullYear();
    const year = parseInt(searchParams.get('year') || '0');
    const rangedYears: [number, number] = [
        parseInt(
            splitStringToArray(searchParams.getAll('rangedYears'))[0]
        ) || 2007,
        parseInt(
            splitStringToArray(searchParams.getAll('rangedYears'))[1]
        ) || currentYear
    ];
    const yearsRanged = searchParams.get('yearsRanged');

    const seasons = splitStringToArray(searchParams.getAll('seasons'));
    const statuses = splitStringToArray(searchParams.getAll('statuses'));
    const studio = searchParams.get('studio');

    return {
        censored,
        durations,
        demographicGenres,
        genreGenres,
        themeGenres,
        kinds,
        limit,
        order,
        ratings,
        score,
        year,
        rangedYears,
        yearsRanged,
        seasons,
        statuses,
        studio
    };
}
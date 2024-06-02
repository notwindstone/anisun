import {ReadonlyURLSearchParams} from "next/navigation";

export default function getAllSearchParams(searchParams: ReadonlyURLSearchParams) {
    const censored = searchParams.get('censored');
    const durations = searchParams.getAll('durations');
    const demographicGenres = searchParams.getAll('demographicGenres');
    const genreGenres = searchParams.getAll('genreGenres');
    const themeGenres = searchParams.getAll('themeGenres');
    const kinds = searchParams.getAll('kinds');
    const limit = parseInt(searchParams.get('limit') ?? '20');
    const order = searchParams.get('order');
    const ratings = searchParams.getAll('ratings');
    const score = parseInt(searchParams.get('score') ?? '7');

    const currentYear = new Date().getFullYear();
    const year = parseInt(searchParams.get('year') || currentYear.toString());
    const rangedYears: [number, number] = [
        parseInt(searchParams.getAll('rangedYears')[0]) || 2007,
        parseInt(searchParams.getAll('rangedYears')[1]) || currentYear
    ];
    const yearsRanged = searchParams.get('yearsRanged');

    const seasons = searchParams.getAll('seasons');
    const statuses = searchParams.getAll('initialStatuses');
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
import {ReadonlyURLSearchParams} from "next/navigation";

export default function getAllSearchParams(searchParams: ReadonlyURLSearchParams) {
    const limit = searchParams.get('limit');
    const order = searchParams.get('order');
    const kind = searchParams.get('kind');
    const status = searchParams.get('status');
    const season = searchParams.get('season');
    const score = searchParams.get('score');
    const duration = searchParams.get('duration');
    const rating = searchParams.get('rating');
    const genre = searchParams.get('genre');
    const studio = searchParams.get('studio');
    const censored = searchParams.get('censored');

    return {
        limit,
        order,
        kind,
        status,
        season,
        score,
        duration,
        rating,
        genre,
        studio,
        censored,
    };
}
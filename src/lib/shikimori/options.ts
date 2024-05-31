import {AnimesType} from "@/types/Shikimori/Queries/Animes.type";

export const options = ({
    ids,
    search,
    limit,
    genre,
    status,
    studio,
    year,
    order,
    page,
    filter,
    score,
    kind,
}: AnimesType) => {
    function userFilterOptions() {
        if (!filter) {
            return;
        }

        let filterOptions = ``;

        for (const option of filter) {
            filterOptions = `${filterOptions}${option} `;
        }

        return filterOptions;
    }

    let query = "";
    const userFilter = userFilterOptions();

    if (ids) {
        query = `${query}ids: "${ids}"`;
    }

    if (search) {
        query = `${query}search: "${search}", `;
    }

    if (limit) {
        query = `${query}limit: ${limit}, `;
    }

    if (genre) {
        query = `${query}genre: "${genre}"`;
    }

    if (status) {
        query = `${query}status: "${status}", `;
    }

    if (studio) {
        query = `${query}studio: "${studio}", `;
    }

    if (year) {
        query = `${query}season: "${year}", `;
    }

    if (order) {
        query = `${query}order: ${order}, `;
    }

    if (page) {
        query = `${query}page: ${page}, `;
    }

    if (kind) {
        query = `${query}kind: ${kind}`;
    }

    if (score) {
        query = `${query}score: ${score}`;
    }

    const defaultFilter = `
        id
        malId
        name
        russian
        licenseNameRu
        english
        japanese
        synonyms
        kind
        rating
        score
        status
        episodes
        episodesAired
        duration
        airedOn {
            year
            month
            day
            date
        }
        releasedOn {
            year
            month
            day
            date
        }
        url
        season
    
        poster {
            id
            originalUrl
            mainUrl
        }
    
        fansubbers
        fandubbers
        licensors
        createdAt
        updatedAt
        nextEpisodeAt
        isCensored
        
        genres {
            id
            name
            russian
            kind
        }
        studios {
            id
            name
            imageUrl
        }
        
        externalLinks {
            id
            kind
            url
            createdAt
            updatedAt
        }
        
        personRoles {
            id
            rolesRu
            rolesEn
            person {
                id
                name
                poster { id }
            }
        }
        characterRoles {
            id
            rolesRu
            rolesEn
            character {
                id
                name
                poster { id }
            }
        }
    
        related {
            id
            anime {
                id
                name
                poster { id mainUrl originalUrl }
            }
            manga {
                id
                name
                poster { id mainUrl originalUrl }
            }
            relationRu
            relationEn
        }
    
        videos {
            id
            url
            name
            kind
            playerUrl
            imageUrl
        }
        
        screenshots {
            id
            originalUrl
            x166Url
            x332Url
        }
    
        scoresStats {
            score
            count
        }
        statusesStats {
            status
            count
        }
    
        description
        descriptionHtml
        descriptionSource
    `;

    return {
        method: 'POST',
        url: 'https://shikimori.one/api/graphql',
        headers: {
            'content-type': 'application/json',
            'User-Agent': 'Animeth'
        },
        data: {
            query: `
                    {
                        animes(${query}) {
                            ${userFilter ?? defaultFilter}
                        }
                    }
                `
        }
    };
};
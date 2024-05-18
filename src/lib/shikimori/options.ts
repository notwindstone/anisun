export const options = ({ ids, search, limit, status, year, order, page, filter }: any) => {
    let query = ""

    if (ids) {
        query = `${query}ids: "${ids}"`
    }

    if (search) {
        query = `${query}search: "${search}", `
    }

    if (limit) {
        query = `${query}limit: ${limit}, `
    }

    if (status) {
        query = `${query}status: "${status}", `
    }

    if (year) {
        query = `${query}season: "${year}", `
    }

    if (order) {
        query = `${query}order: ${order}, `
    }

    if (page) {
        query = `${query}page: ${page}, `
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
            }
            manga {
                id
                name
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
    `

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
                            ${filter ?? defaultFilter}
                        }
                    }
                `
        }
    }
}
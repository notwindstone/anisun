import {AnimesType} from "@/types/Shikimori/Queries/AnimesType";

export const options = ({ ids, search, limit, status, year, order }: AnimesType) => {
    let query = ""

    if (ids) query = `${query}ids: "${ids}"`
    if (search) query = `${query}search: "${search}", `
    if (limit) query = `${query}limit: ${limit}, `
    if (status) query = `${query}status: "${status}", `
    if (year) query = `${query}season: "${year}", `
    if (order) query = `${query}order: ${order}, `

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
                        }
                    }
                `
        }
    }
}
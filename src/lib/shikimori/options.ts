import {StatusType} from "@/types/Shikimori/StatusType";

export const options = ({ limit, status, year, order } : { limit: number, status: StatusType, year: string, order: string }) => {
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
                        animes(limit: "${limit}", status: "${status}", season: "${year}", order: "${order}) {
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
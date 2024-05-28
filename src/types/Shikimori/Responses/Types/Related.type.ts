export type RelatedType = {
    id: string;
    anime: {
        id: string;
        name: string;
        poster: {
            id: string;
            mainUrl: string;
            originalUrl: string;
        };
    } | null;
    manga: {
        id: string;
        name: string;
        poster: {
            id: string;
            mainUrl: string;
            originalUrl: string;
        };
    } | null;
    relationRu: string;
    relationEn: string;
};
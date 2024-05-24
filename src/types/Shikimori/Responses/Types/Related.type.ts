export type RelatedType = {
    id: string;
    anime: {
        id: string;
        name: string;
    } | null;
    manga: {
        id: string;
        name: string;
    } | null;
    relationRu: string;
    relationEn: string;
};
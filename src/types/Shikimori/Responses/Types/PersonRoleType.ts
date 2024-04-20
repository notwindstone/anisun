export type PersonRoleType = {
    id: string;
    rolesRu: string[];
    rolesEn: string[];
    person: {
        id: string;
        name: string;
        poster: string | null;
    }
}
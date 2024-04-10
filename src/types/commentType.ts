export type CommentType = {
    uuid: string;
    parentuuid: string | null;
    title: string;
    branch: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: unknown[] | null;
    dislikes: unknown[] | null;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
    children?: CommentType[];
};
import {CommentType} from "@/types/Comments/Comment.type";

export type MutationInputType = {
    uuid: string,
    likes?: unknown[] | undefined,
    dislikes?: unknown[] | undefined,
    mutationQueryKey: string | null,
    isChild?: boolean,
    newComment?: CommentType,
    isDeleted?: boolean,
    isEdited?: boolean,
    message?: string,
};

export type MutationCommentType = {
    mutatingComment: CommentType,
    likes?: unknown[] | undefined,
    dislikes?: unknown[] | undefined,
    isChild?: boolean,
    newComment?: CommentType,
    isDeleted?: boolean,
    isEdited?: boolean,
    message?: string,
};
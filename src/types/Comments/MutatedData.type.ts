import {CommentType} from "@/types/Comments/Comment.type";

export type MutatedDataType = {
    pages: {
        data: CommentType[];
    }[]
};
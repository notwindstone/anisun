import {add} from "@/api/comments/functions/add";
import {get} from "@/api/comments/functions/get";
import {remove} from "@/api/comments/functions/remove";
import {edit} from "@/api/comments/functions/edit";
import {like} from "@/api/comments/functions/like";
import {dislike} from "@/api/comments/functions/dislikes";

export const comments = {
    get: get,
    add: add,
    edit: edit,
    remove: remove,
    like: like,
    dislike: dislike,
}
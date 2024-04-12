import {add} from "@/lib/comments/functions/add";
import {remove} from "@/lib/comments/functions/remove";
import {edit} from "@/lib/comments/functions/edit";
import {like} from "@/lib/comments/functions/like";
import {dislike} from "@/lib/comments/functions/dislike";
import {getParent} from "@/lib/comments/functions/getParent";
import {getChildren} from "@/lib/comments/functions/getChildren";

export const comments = {
    getParent: getParent,
    getChildren: getChildren,
    add: add,
    edit: edit,
    remove: remove,
    like: like,
    dislike: dislike,
}
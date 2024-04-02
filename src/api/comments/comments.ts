import {add} from "@/api/comments/functions/add";
import {get} from "@/api/comments/functions/get";
import {remove} from "@/api/comments/functions/remove";
import {edit} from "@/api/comments/functions/edit";

export const comments = {
    get: get,
    add: add,
    edit: edit,
    remove: remove
}
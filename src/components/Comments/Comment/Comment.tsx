import {CommentType} from "@/types/CommentType";

export function Comment({ comment }: { comment: CommentType }) {
    return (
        <div>
            {comment.message}
            {'\n'}
            {comment.children && comment.children[0].count}
        </div>
    )
}
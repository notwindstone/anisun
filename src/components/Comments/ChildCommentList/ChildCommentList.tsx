import {useInfiniteQuery} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {Comment} from "@/components/Comments/Comment/Comment";

export function ChildCommentList({ uuid }: { uuid: string }) {
    const {
        data,
        error,
        status
        // @ts-ignore
    } = useInfiniteQuery({
        queryKey: ["comments"],
        queryFn: retrieveChildComments,
        refetchInterval: 60000,
    })

    async function retrieveChildComments() {
        return await comments.getChildren({ uuid: uuid })
    }

    const childCommentSection = status === 'pending' ? (
        <>Loading...</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        data.map((group) => {
            const commentGroup: CommentType[] | null = group.data ?? []

            return commentGroup.map((comment) => {
                return (
                    <Comment key={comment.uuid} comment={comment} />
                )
            })
        })
    )
}
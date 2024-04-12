import {CommentType} from "@/types/CommentType";
import {UnstyledButton} from "@mantine/core";

export function Comment({ comment }: { comment: CommentType }) {
    const children = comment.children ? comment.children[0].count : 0

    return (
        <div>
            {comment.message}
            {'\n'}
            {
                children > 0
                    && (
                        <UnstyledButton
                            onClick={async () => console.log(comment.uuid)}
                        >
                            Раскрыть ответы
                        </UnstyledButton>
                    )
            }
        </div>
    )
}
import {CommentType} from "@/types/CommentType";
import {UnstyledButton} from "@mantine/core";
import {useState} from "react";
import {ChildCommentList} from "@/components/Comments/ChildCommentList/ChildCommentList";

export function Comment({ comment }: { comment: CommentType }) {
    const [retrieveChild, setRetrieveChild] = useState(false)

    const children = comment.children ? comment.children[0].count : 0

    return (
        <div>
            {comment.message}
            {'\n'}
            {
                children > 0
                    && (
                        <UnstyledButton
                            onClick={() => setRetrieveChild(true)}
                        >
                            Раскрыть ответы
                        </UnstyledButton>
                    )
            }
            {retrieveChild && (<ChildCommentList uuid={comment.uuid} />)}
        </div>
    )
}
"use client"

import {commentType} from "@/types/commentType";
import {FC, useState} from "react";
import {addComment} from "@/api/comments/addComment";
import {editComment} from "@/api/comments/editComment";
import Comment from "@/components/Comments/Comment";
import AddComment from "@/components/Comments/AddComment";

interface CommentsProps {
    comments: commentType[];
}

const Comments: FC<CommentsProps> = ({ comments }) => {
    const [commentItems, setCommentItems] = useState<commentType[]>(comments)

    const createComment = (avatar: string, username: string, message: string) => {
        const id = (commentItems.at(-1)?.id || 0) + 1;
        addComment(id, avatar, username, message)
        setCommentItems((prev) => [...prev, { id: id, avatar, username, message }])
    }

    const changeComment = (id: number, message: string) => {
        setCommentItems((prev) =>
            prev.map((comment) => (comment.id === id ? { ...comment, message } : comment))
        )
        editComment(id, message)
    }

    const deleteComment = (id: number) => {
        setCommentItems((prev) => prev.filter((comment) => comment.id !== id))
        deleteComment(id)
    }

    const commentsSection = commentItems.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          changeComment={changeComment}
          deleteComment={deleteComment}
        />
    ))

    return (
        <div>
            <AddComment createComment={createComment} />
            {commentsSection}
        </div>
    )
}

export default Comments
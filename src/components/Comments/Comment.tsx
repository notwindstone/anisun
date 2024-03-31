"use client"

import {commentType} from "@/types/commentType";
import {ChangeEvent, FC, useState} from "react";

interface CommentProps {
    comment: commentType;
    changeComment: (id: number, message: string) => void;
    deleteComment: (id: number) => void;
}

const Comment: FC<CommentProps> = ({
    comment,
    changeComment,
    deleteComment,
}) => {
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(comment.message)

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSubmit = async () => {
        changeComment(comment.id, text)
        setEditing(false)
    }

    const handleCancel = () => {
        setEditing(false)
        setText(comment.message)
    }

    const handleDelete = () => {
        if (confirm('Вы уверены?')) {
            deleteComment(comment.id)
        }
    }

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                readOnly={!editing}
            />
            <div>
                {editing ? (
                    <button
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                )}
                {editing ? (
                    <button
                        onClick={handleCancel}
                    >
                        Close
                    </button>
                ) : (
                    <button
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}

export default Comment
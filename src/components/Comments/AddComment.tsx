"use client"

import {ChangeEvent, FC, useState} from "react";

interface AddCommentProps {
    createComment: (avatar: string, username: string, message: string) => void;
}

const AddComment: FC<AddCommentProps> = ({ createComment }) => {
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAdd = async () => {
        createComment("https://media.discordapp.net/attachments/551038566306938901/1223641554460086333/standard-main_2x-topaz-enhance-1920w.png?ex=661a9800&is=66082300&hm=1c6b2aad3fcae52e2e48170499cbca2505b2df83d2c8582cadfaef25f2b761ae&=&format=webp&quality=lossless&width=1194&height=671", "windstone", input)
        setInput("")
    }

    return (
        <div>
            <input
                type="text"
                onChange={handleInput}
                value={input}
            />
            <button
                onClick={handleAdd}
            >
                Add
            </button>
        </div>
    )
}

export default AddComment
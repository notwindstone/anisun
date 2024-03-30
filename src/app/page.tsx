"use client";

import styles from "./page.module.css";
import Comments from "@/components/Comments/Comments";
import {addComment} from "@/api/comments/addComment";
import {Button} from "@mantine/core";

export default function Home() {
    const handleClick = async () => {
        await addComment(1, "https://media.discordapp.net/attachments/551038566306938901/1223641554460086333/standard-main_2x-topaz-enhance-1920w.png?ex=661a9800&is=66082300&hm=1c6b2aad3fcae52e2e48170499cbca2505b2df83d2c8582cadfaef25f2b761ae&=&format=webp&quality=lossless&width=1194&height=671", "windstone", "Hello world")
    }

    return (
        <main className={styles.main}>
            <>Test</>
            <Button onClick={handleClick}>Add comment</Button>
            <Comments />
        </main>
    );
}

import styles from "./page.module.css";
import Comments from "@/components/Comments/Comments";
import {addComment} from "@/api/comments/addComment";
import {Button} from "@mantine/core";
import {deleteComment} from "@/api/comments/deleteComment";

export default function Home() {
    return (
        <main className={styles.main}>
            <>Test</>
            <Comments />
        </main>
    );
}

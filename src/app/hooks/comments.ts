import {useQuery} from "@tanstack/react-query";
import db from "@/db/drizzle";
import {comments} from "@/db/schema";
import {eq} from "drizzle-orm";

export function useCommentsList(title: string) {
    const { data } = useQuery({
        queryKey: ['comments', title],
        queryFn: async () => {
            await db.select().from(comments).where(eq(comments.title, title))
        },
        refetchInterval: 5000,
    })
    return data
}
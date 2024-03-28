import { auth } from '@clerk/nextjs';

export async function Comments() {
    const { userId } = auth();

    // console.log(userId);
    // user_2eJ8bt4o6wkYgIbWKBnNsu4b21u

    if (!userId) {
        return (
            <>Войдите в аккаунт, чтобы написать комментарий.</>
        );
    }

    return (
        <>456</>
    );
}

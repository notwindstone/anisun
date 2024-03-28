import {auth} from "@clerk/nextjs";

export async function Comments() {
    const { userId } = auth();

    console.log(userId);

    return (
        <></>
    );
}

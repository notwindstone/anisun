import {useQuery} from "@tanstack/react-query";
import {account} from "@/api/account/account";

export default function Account({ user }: { user: any }) {
   const getAccountReputation = async () => {
        await account.reputation({ userid: user.id })
    }

    const { isPending, isError, data } = useQuery({
        queryKey: ['accountReputation', user.id],
        queryFn: getAccountReputation,
    })

    return (
        <></>
    )
}
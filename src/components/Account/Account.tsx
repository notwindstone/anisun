"use client"

import {useQuery} from "@tanstack/react-query";
import {account} from "@/api/account/account";
import {Loader, Text} from "@mantine/core";

export default function Account({ userid }: { userid: string }) {
   const getAccountReputation = async () => {
        return await account.reputation({ userid: userid })
    }

    const { isPending, data } = useQuery({
        queryKey: ['accountReputation', userid],
        queryFn: getAccountReputation,
    })

    return (
        <>
            <Text>Репутация:
                {
                    isPending
                        ? (
                            <Loader size="1rem" />
                        )
                        : data?.data
                }
            </Text>
        </>
    )
}
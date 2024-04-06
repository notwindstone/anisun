"use client"

import {useQuery} from "@tanstack/react-query";
import {account} from "@/api/account/account";
import {Loader, Text} from "@mantine/core";

export default function Account({ userid }: { userid: string }) {
   const getAccountStats = async () => {
       const accountReputation = await account.reputation({ userid: userid })
       const accountTotalComments = await account.totalComments({ userid: userid })

       return { reputation: accountReputation, totalComments: accountTotalComments }
    }

    const { isPending, data } = useQuery({
        queryKey: ['accountStats', userid],
        queryFn: getAccountStats,
    })

    return (
        <>
            <Text>Репутация:
                {
                    isPending
                        ? (
                            <Loader size="1rem" />
                        )
                        : data?.reputation.data
                }
            </Text>
            <Text>Комментариев:
                {
                    isPending
                        ? (
                            <Loader size="1rem" />
                        )
                        : data?.totalComments.data
                }
            </Text>
        </>
    )
}
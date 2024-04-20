"use client"

import {useQuery} from "@tanstack/react-query";
import {account} from "@/lib/account/account";
import {Avatar, Skeleton, Text, Title} from "@mantine/core";
import React from "react";
import {UserResource} from "@clerk/types";
import dayjs from "dayjs";
import 'dayjs/locale/ru'
import Link from "next/link";

export default function Account({ user }: { user: UserResource }) {
    dayjs.locale('ru')
    const getAccountStats = async () => {
       const accountReputation = await account.reputation({ userid: user.id })
       const accountTotalComments = await account.totalComments({ userid: user.id })

       return { reputation: accountReputation.data, totalComments: accountTotalComments.data }
    }

    const { isPending, data } = useQuery({
        queryKey: ['accountStats', user.id],
        queryFn: getAccountStats,
    })

    return (
        <>
            <Avatar
                src={user.imageUrl}
                alt={user.username ?? 'unknown username'}
                size={64}
                component={Link}
                href="/"
            >
                {
                    user.username
                        ? user.username[0]
                        : '?'
                }
            </Avatar>
            <Title>{user.username}</Title>
            <Text>
                {
                    dayjs(user.lastSignInAt).format('D MMMM YYYY в H:mm')
                }
            </Text>

            <Text>
                {
                    dayjs(user.createdAt).format('D MMMM YYYY в H:mm')
                }
            </Text>

            <Skeleton visible={isPending} width={256} height={24}>
                <Text>Репутация: {data?.reputation}</Text>
            </Skeleton>

            <Skeleton visible={isPending} width={256} height={24}>
                <Text>Комментариев: {data?.totalComments}</Text>
            </Skeleton>
        </>
    )
}
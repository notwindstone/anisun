"use client";

import {useQuery} from "@tanstack/react-query";
import {account} from "@/lib/account/account";
import {Avatar, Flex, Image, rem, Skeleton, Stack, Text, Title, Tooltip} from "@mantine/core";
import React from "react";
import {UserResource} from "@clerk/types";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import Link from "next/link";
import classes from './Account.module.css';
import {useTranslations} from "next-intl";

export default function Account({ user }: { user: UserResource }) {
    const info = useTranslations('Info');
    const translate = useTranslations('Translations');
    const locale = info('locale');

    dayjs.locale(locale);

    const getAccountStats = async () => {
        const accountReputation = await account.reputation({ userid: user.id });
        const accountTotalComments = await account.totalComments({ userid: user.id });

        return { reputation: accountReputation.data, totalComments: accountTotalComments.data };
    };

    const { isPending, data } = useQuery({
        queryKey: ['accountStats', user.id],
        queryFn: getAccountStats,
    });

    const tooltipAvatarInfo = (
        <Flex
            align="center"
            direction="column"
            className={classes.tooltipMenu}
        >
            <Image
                radius="md"
                src={user.imageUrl}
                w={384}
                h={384}
                alt={`${user.username ?? 'unknown username'} profile picture`}
            />
            <Stack className={classes.tooltipInfo} align="center" gap={0}>
                <Title order={2}>{user.username ?? 'unknown username'}</Title>
            </Stack>
        </Flex>
    );

    return (
        <Flex gap={rem(16)}>
            <Tooltip
                radius="md"
                color="black"
                openDelay={500}
                label={tooltipAvatarInfo}
                position="top-start"
            >
                <Avatar
                    src={user.imageUrl ?? '/blurred.png'}
                    alt={user.username ?? 'unknown username'}
                    size={112}
                    component={Link}
                    href={user.imageUrl}
                    target="_blank"
                >
                    {
                        user.username
                            ? user.username[0]
                            : '?'
                    }
                </Avatar>
            </Tooltip>
            <Stack gap={0}>
                <Text fw={500} size={rem(36)}>{user.username}</Text>
                <Text>
                    {
                        `${translate('common__account-creation-date-label')}: ${dayjs(user.createdAt).format(translate('common__dayjs-format-date'))}`
                    }
                </Text>
                {
                    isPending ? (
                        <>
                            <Stack gap={rem(4)}>
                                <Skeleton w={256} h={24} />
                                <Skeleton w={256} h={24} />
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Text>
                                {
                                    `${translate('common__reputation-label')}: ${data?.reputation}`
                                }
                            </Text>
                            <Text>
                                {
                                    `${translate('common__comments-label')}: ${data?.totalComments}`
                                }
                            </Text>
                        </>
                    )
                }
            </Stack>
        </Flex>
    );
}
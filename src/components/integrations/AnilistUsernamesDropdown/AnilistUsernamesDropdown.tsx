import { useQuery } from "@tanstack/react-query";
import getGraphQLResponse from "@/lib/misc/getGraphQLResponse";
import { AnimeType } from "@/types/Anime/Anime.type";
import { RemoteRoutes } from "@/constants/routes";
import { GraphQLClient } from "@/lib/graphql/client";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { SetStateAction, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

const placeholderArray = [1, 2, 3, 4, 5, 6];

export default function AnilistUsernamesDropdown({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (search: SetStateAction<string>) => void;
}): React.ReactNode {
    const [focused, setFocused] = useState<string>("");
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const { data, isPending, error } = useQuery<Array<{
        name?:      string;
        createdAt?: string;
        avatar?:    {
            large?: string;
        };
    }>>({
        queryKey: ["anilist", "usernames", search],
        queryFn:  async () => {
            const data = await getGraphQLResponse<{ media: AnimeType }>({
                url: RemoteRoutes.Anilist.GraphQL.Root,
                ...GraphQLClient.Anilist({
                    queries: [
                        {
                            alias:     "users",
                            name:      "Page.Users",
                            variables: {
                                page: {
                                    page:    1,
                                    perPage: 6,
                                },
                                media: {
                                    search: search,
                                },
                            },
                            fields: [
                                "name",
                                "createdAt",
                                "avatar.large",
                            ],
                        },
                    ],
                }),
            });

            if (
                !("users" in data.Users) ||
                !Array.isArray(data.Users.users)
            ) {
                return [];
            }

            return data.Users.users;
        },
    });

    if (isPending) {
        return (
            <>
                {
                    placeholderArray.map((item) => {
                        return (
                            <div
                                className="animate-pulse rounded-md w-full h-12"
                                style={{
                                    backgroundColor: parseTailwindColor({
                                        color: base,
                                        step:  theme === DarkThemeKey
                                            ? 800 : 200,
                                    }),
                                }}
                                key={item}
                            />
                        );
                    })
                }
            </>
        );
    }

    if (error) {
        return (
            <>
                <div
                    className="flex justify-center items-center rounded-md w-full min-h-12 text-xs xs:text-sm text-center text-balance"
                >
                    An error occurred: {error?.message}. Maybe waiting will help you.
                </div>
            </>
        );
    }

    return (
        <>
            {
                data.map((user) => {
                    return (
                        <button
                            disabled={focused === user?.name}
                            className="transition cursor-pointer flex flex-nowrap gap-2 p-2 rounded-md hover:bg-[theme(colors.black/.1)] dark:hover:bg-[theme(colors.white/.1)] disabled:opacity-60 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                            onClick={() => {
                                setFocused(user?.name ?? "");
                                setSearch(user?.name ?? "");
                            }}
                            key={user?.name}
                        >
                            <div className="select-none flex shrink-0">
                                <ConfiguredImage
                                    className="transition w-8 h-8 object-cover rounded-md"
                                    alt="User avatar"
                                    src={user?.avatar?.large}
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="flex text-sm items-start flex-col gap-1 text-start break-all">
                                <p className="leading-none">
                                    {user?.name}
                                </p>
                                <p className="opacity-60 leading-none">
                                    {
                                        user?.createdAt !== undefined && (
                                            (new Date(Number(user.createdAt) * 1000)).toDateString()
                                        )
                                    }
                                </p>
                            </div>
                        </button>
                    );
                })
            }
        </>
    );
}

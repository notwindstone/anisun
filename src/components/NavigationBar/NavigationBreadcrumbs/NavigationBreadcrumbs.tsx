import {Breadcrumbs, Loader, Skeleton, Text} from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {IconChevronRight, IconHome} from "@tabler/icons-react";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import translateRouteNames from "@/utils/translateRouteNames";
import {useUser} from "@clerk/nextjs";
import classes from './NavigationBreadcrumbs.module.css';
import useRipple from "use-ripple-hook";

export default function NavigationBreadcrumbs() {
    let titlePath: string | null
    const [ripple, event] = useRipple();
    const { user } = useUser();
    const shikimori = client()
    const pathname = usePathname()
    const paths = pathname
        .split('/')
        .filter((path) => path)
    const isTitlePath = paths.length > 1 && paths[paths.length - 2] === 'titles'
    if (isTitlePath) {
        titlePath = paths[paths.length - 1]
    }

    const { data } = useQuery({
        queryKey: ['breadcrumbs', pathname],
        queryFn: async () => {
            if (!titlePath) {
                return null
            }

            // titlePath format is "12345-word-word-word", sometimes with a letter at the beginning
            const shikimoriId = titlePath.split('-')[0].replace(/\D/g, '')

            return (await shikimori.animes.byId({ ids: shikimoriId })).animes
        }
    })
    const breadcrumbs = paths.map((breadcrumb, index, array) => {
        const currentPathArray = array.slice(0, index + 1)
        const currentPathname = currentPathArray.join('/')
        const translatedBreadcrumb = translateRouteNames(breadcrumb)
        const previousBreadcrumb = array[index - 1]
        const russianAnimeName = data?.[0].russian
        const originalAnimeName = data?.[0].name
        let currentBreadcrumb

        switch (previousBreadcrumb) {
            case "titles":
                currentBreadcrumb = russianAnimeName ?? originalAnimeName
                break
            case "account":
                currentBreadcrumb = user?.username
                break
            default:
                currentBreadcrumb = translatedBreadcrumb
                break
        }

        return (
            <Text
                size="sm"
                component={Link}
                key={breadcrumb}
                href={`/${currentPathname}`}
                onPointerDown={event}
            >
                {
                    currentBreadcrumb ?? (
                        <Skeleton height={20} width={128} />
                    )
                }
            </Text>
        )
    })

    return (
        <Breadcrumbs
            ref={ripple}
            classNames={{
                root: classes.root,
            }}
            separator={<IconChevronRight size={22} stroke={1.5} />}
        >
            <Text
                component={Link}
                href='/'
                onPointerDown={event}
            >
                <IconHome size={20} stroke={1.5} />
            </Text>
            {breadcrumbs}
        </Breadcrumbs>
    )
}
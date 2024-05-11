import {Breadcrumbs, Loader, Skeleton} from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {IconChevronRight, IconHome} from "@tabler/icons-react";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import translateRouteNames from "@/utils/translateRouteNames";
import {useUser} from "@clerk/nextjs";

export default function NavigationBreadcrumbs() {
    let titlePath: string | null
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

            // titlePath format is "12345-word-word-word", sometimes with a letter in the beginning
            const shikimoriId = titlePath.split('-')[0].replace(/\D/g, '')

            return (await shikimori.animes.byId({ ids: shikimoriId })).animes
        }
    })
    const breadcrumbs = paths.map((path, index, array) => {
        const translatedPath = translateRouteNames(path)
        const previousPath = array[index - 1]
        const russianAnimeName = data?.[0].russian
        const originalAnimeName = data?.[0].name
        let currentPath

        switch (previousPath) {
            case "titles":
                currentPath = russianAnimeName ?? originalAnimeName
                break
            case "account":
                currentPath = user?.username
                break
            default:
                currentPath = translatedPath
                break
        }

        return (
            <Link key={path} href={path}>
                {
                    currentPath ?? (
                        <Skeleton height={16} width={128} />
                    )
                }
            </Link>
        )
    })

    return (
        <Breadcrumbs separator={<IconChevronRight size={22} stroke={1.5} />}>
            <Link href='/'>
                <IconHome size={22} stroke={1.5} />
            </Link>
            {breadcrumbs}
        </Breadcrumbs>
    )
}
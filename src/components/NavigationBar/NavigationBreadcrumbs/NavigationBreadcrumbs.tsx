import {Breadcrumbs} from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {IconChevronRight, IconHome} from "@tabler/icons-react";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {useEffect, useState} from "react";

export default function NavigationBreadcrumbs() {
    const [titleName, setTitleName] = useState(null)
    let titlePath: string | null
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
        queryKey: ['breadcrumbs'],
        queryFn: async () => {
            if (!titlePath) {
                return null
            }

            const shikimoriId = titlePath.split('-')[0].replace(/\D/g, '')

            return (await shikimori.animes.byId({ ids: shikimoriId })).animes
        }
    })
    const breadcrumbs = paths.map((path, index, array) => {
        if (isTitlePath && array[array.length - 1] === 'titles') {
            return (
                <Link key={path} href={path}>
                    {titleName}
                </Link>
            )
        }

        return (
            <Link key={path} href={path}>
                {path}
            </Link>
        )
    })

    useEffect(() => {
        if (!data) {
            return
        }

        setTitleName(data[0].name)
    }, [data]);

    return (
        <Breadcrumbs separator={<IconChevronRight size={22} stroke={1.5} />}>
            <Link href='/'>
                <IconHome size={22} stroke={1.5} />
            </Link>
            {breadcrumbs}
        </Breadcrumbs>
    )
}
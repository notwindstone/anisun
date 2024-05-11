import {Breadcrumbs} from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {IconHome} from "@tabler/icons-react";

export default function NavigationBreadcrumbs() {
    const pathname = usePathname()
    const paths = pathname
        .split('/')
        .filter((path) => path)
    const breadcrumbs = paths.map((path) => {
        return (
            <Link key={path} href={path}>
                {path}
            </Link>
        )
    })

    return (
        <Breadcrumbs>
            <Link href='/'>
                <IconHome size={22} stroke={1.5} />
            </Link>
            {breadcrumbs}
        </Breadcrumbs>
    )
}
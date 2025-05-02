import Link from "next/link";
import Button from "@/components/Button/Button";
import { ShikimoriIcon } from "@/constants/icons";
import { OAuth2Routes } from "@/constants/routes";

export default async function Page() {
    return (
        <div className="flex items-center p-4 gap-4">
            <Link href={"/"}>
                home
            </Link>
            <Link href={OAuth2Routes.Shikimori.Login}>
                <Button custom={{
                    style: "base",
                }}>
                    <div className="fill-white w-5 h-5">
                        {ShikimoriIcon}
                    </div>
                    <p>
                        Shikimori
                    </p>
                </Button>
            </Link>
        </div>
    );
}

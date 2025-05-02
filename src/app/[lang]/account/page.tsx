import Button from "@/components/Button/Button";
import { ShikimoriIcon } from "@/constants/icons";
import { OAuth2Routes } from "@/constants/routes";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex items-center p-4 gap-4">
            <Link href={"/"}>
                home
            </Link>
            <a href={OAuth2Routes.Shikimori.Login}>
                <Button
                    custom={{
                        style: "base",
                    }}
                    label={"Login using Shikimori"}
                >
                    <div className="fill-white w-5 h-5">
                        {ShikimoriIcon}
                    </div>
                    <p>
                        Shikimori
                    </p>
                </Button>
            </a>
        </div>
    );
}

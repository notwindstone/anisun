import {StatusType} from "@/types/Shikimori/General/Status.type";
import {MantineColor} from "@mantine/core";
import {OrderType} from "@/types/Shikimori/Queries/Order.type";

export type VariablesType = {
    imagePlaceholder: string;
    sorting: {
        latest: {
            label: string;
            value: StatusType;
        };
        anons: {
            label: string;
            value: StatusType;
        };
        ongoing: {
            label: string;
            value: StatusType;
        };
        released: {
            label: string;
            value: StatusType;
        };
    };
    sortingAlternateTranslations: {
        anons: {
            singular: string;
            withPrepositions: string;
        },
        ongoing: {
            singular: string;
            withPrepositions: string;
        },
        released: {
            singular: string;
            withPrepositions: string;
        },
    };
    settings: {
        general: {
            label: string;
            value: "general";
        };
        about: {
            label: string;
            value: "about";
        };
        account: {
            label: string;
            value: "account";
        }
    };
    iconProps: {
        size: number;
        stroke: number;
    };
    rating: {
        none: string;
        g: string;
        pg: string;
        pg_13: string;
        r: string;
        r_plus: string;
        rx: string;
    };
    rippleColor: {
        color: string;
    };
    mantineColors: MantineColor[];
    websiteLinks: {
        label: string;
        href: string;
    }[];
    kind: {
        tv: string;
        movie: string;
        ova: string;
        ona: string;
        special: string;
        tv_special: string;
        music: string;
        pv: string;
        cm: string;
        default: string;
    };
    filters: {
        order: {
            label: string;
            value: OrderType;
        }[];
    };
};
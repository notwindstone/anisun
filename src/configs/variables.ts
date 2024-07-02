import {VariablesType} from "@/types/Config/Variables.type";

const MOVIE = "common__kind-movie";
const MUSIC = "common__kind-music";
const TV = "common__kind-tv";
const TV_13 = "common__kind-tv-13";
const TV_24 = "common__kind-tv-24";
const TV_48 = "common__kind-tv-48";
const OVA = "common__kind-ova";
const ONA = "common__kind-ona";
const SPECIAL = "common__kind-special";
const TV_SPECIAL = "common__kind-tv-special";
const PV = "common__kind-pv";
const CM = "common__kind-cm";

const ID_ASC = "common__order-id-label";
const ID_DESC = "common__order-id_desc-label";
const RANKED = "common__order-ranked-label";
const KIND = "common__order-kind-label";
const POPULARITY = "common__order-popularity-label";
const NAME = "common__order-name-label";
const AIRED_ON = "common__order-aired_on-label";
const EPISODES = "common__order-episodes-label";
const STATUS = "common__order-status-label";
const RANDOM = "common__order-random-label";

export const variables: VariablesType = {
    "imagePlaceholder": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAIAAABmX9r1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJkSURBVChTFctJTxNRAADgN29mOl2mi7R0gxYpNgLFBU2KKBAjAS9GjhoTb3rzz3gwXk2IiRduJhKIiWikIkYbYqkESulMd6bttNPZ37yqx+/wEW8PLBWBfHMgdi2kWV4KK5p1KcYsJUnTLJfKItk8Jp6vq4MB8FvdG1TunE6UiOF0ko4NQQiA1Oc73O/UhJeKOPCsrRDtfogmYnzP0MnQhLtvYrYiQaAa8TCj9HkqBTKVr+sV1I8huiCzwzdpUThrGv1xLzor7ztT/l+ZDDm/+nR3L5tvk1sfd0zXiN1SXFA1z3MhVmeKP7BcLdTqkEbts2Ied5UgIO4FKylvPc7Klj386uVrEAhyLdxuCOQM64xTNN3MVx2eK6vP/BOzoumwXRhVxerwECHrWJQsOLe8bPN6jkwoav381juzfBQNe3VHwHfx2jEvf/qWY51u2MHwc3avZQJs4J98kc/vEo0sU9oOudH23ianCK7SIekPs/li3eegluYuhxBfrnC1Hm782fG7kCgiJ0InnEgaOni0dvfhg5Va4WhsPK4JJ/HpW3NL93e+ZIT6OTBlHVLwMHeQmppcvJO2eYNVhfEsvNAQ5MqVelsNj4QTSXe3K1Mz6RBFA0XtxJIxY3QhGInsb7zZfL/B2H1Sp8OQRq2pk7NRt33IQ9gYVUe8pOuaRA0sEhIev88TiFCeUZsTkoura1NX5wuVpo7I0+z3yZEADUxI4UQioapSanoGWRqZvn19gDF3etzv9tqCgExNVXo9UVBkqdVqy7LcaDSIx09WNM1wOuwYWwCAfwEAPBgQ/wkpXTMBYP4CJN1Ov5yNZo0AAAAASUVORK5CYII=",
    "sorting": {
        "latest": {
            "label": "common__sorting-latest-label",
            "value": "latest"
        },
        "anons": {
            "label": "common__sorting-anons-label",
            "value": "anons"
        },
        "ongoing": {
            "label": "common__sorting-ongoing-label",
            "value": "ongoing"
        },
        "released": {
            "label": "common__sorting-released-label",
            "value": "released"
        },
    },
    "sortingAlternateTranslations": {
        "anons": {
            "singular": "common__sorting-anons-singular-label",
            "withPrepositions": "common__sorting-anons-with-prepositions-label",
        },
        "ongoing": {
            "singular": "common__sorting-ongoing-singular-label",
            "withPrepositions": "common__sorting-ongoing-with-prepositions-label",
        },
        "released": {
            "singular": "common__sorting-released-singular-label",
            "withPrepositions": "common__sorting-released-with-prepositions-label",
        },
    },
    "settings": {
        "general": {
            "label": "common__general-label",
            "value": "general"
        },
        "about": {
            "label": "common__about-label",
            "value": "about"
        },
        "language": {
            "label": "common__language-label",
            "value": "language"
        },
        "account": {
            "label": "common__account-placeholder-label",
            "value": "account"
        },
    },
    "iconProps": {
        "size": 32,
        "stroke": 1.5
    },
    "rating": {
        "none": "неизвестно",
        "g": "G",
        "pg": "PG",
        "pg_13": "PG-13",
        "r": "R-17",
        "r_plus": "R+",
        "rx": "Rx",
    },
    "rippleColor": {
        "color": "var(--anisun-ripple-color)",
    },
    "mantineColors": [
        "black",
        "dark",
        "gray",
        "red",
        "pink",
        "grape",
        "violet",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "green",
        "lime",
        "yellow",
        "orange"
    ],
    "websiteLinks": [
        {
            label: "GitHub",
            href: "https://github.com/windstone-aristotle-yellow/animeth",
        },
        {
            label: "Telegram",
            href: "https://t.me/windst1",
        },
        {
            label: "License",
            href: "https://github.com/windstone-aristotle-yellow/animeth/blob/main/LICENSE",
        },
    ],
    "kind": {
        "tv": TV,
        "movie": MOVIE,
        "ova": OVA,
        "ona": ONA,
        "special": SPECIAL,
        "tv_special": TV_SPECIAL,
        "music": MUSIC,
        "pv": PV,
        "cm": CM,
        "default": "common__unknown-label",
    },
    "filters": {
        "order": [
            {
                "label": ID_ASC,
                "value": "id"
            },
            {
                "label": ID_DESC,
                "value": "id_desc"
            },
            {
                "label": RANKED,
                "value": "ranked"
            },
            {
                "label": KIND,
                "value": "kind"
            },
            {
                "label": POPULARITY,
                "value": "popularity"
            },
            {
                "label": NAME,
                "value": "name"
            },
            {
                "label": AIRED_ON,
                "value": "aired_on"
            },
            {
                "label": EPISODES,
                "value": "episodes"
            },
            {
                "label": STATUS,
                "value": "status"
            },
            {
                "label": RANDOM,
                "value": "random"
            },
        ],
        "kind": [
            {
                "label": MOVIE,
                "value": "movie",
            },
            {
                "label": MUSIC,
                "value": "music",
            },
            {
                "label": ONA,
                "value": "ona",
            },
            {
                "label": OVA,
                "value": "ova",
            },
            {
                "label": SPECIAL,
                "value": "special",
            },
            {
                "label": TV,
                "value": "tv",
            },
            {
                "label": TV_13,
                "value": "tv_13",
            },
            {
                "label": TV_24,
                "value": "tv_24",
            },
            {
                "label": TV_48,
                "value": "tv_48",
            },
            {
                "label": TV_SPECIAL,
                "value": "tv_special",
            },
            {
                "label": PV,
                "value": "pv",
            },
            {
                "label": CM,
                "value": "cm",
            },
        ],
        "season": [
            {
                "label": "common__season-winter",
                "value": "winter",
            },
            {
                "label": "common__season-spring",
                "value": "spring",
            },
            {
                "label": "common__season-summer",
                "value": "summer",
            },
            {
                "label": "common__season-fall",
                "value": "fall",
            },
        ],
        "rating": [
            {
                "label": "common__rating-none-label",
                "value": "none",
            },
            {
                "label": "common__rating-g-label",
                "value": "g",
            },
            {
                "label": "common__rating-pg-label",
                "value": "pg",
            },
            {
                "label": "common__rating-pg-13-label",
                "value": "pg_13",
            },
            {
                "label": "common__rating-r-17-label",
                "value": "r",
            },
            {
                "label": "common__rating-r_plus-label",
                "value": "r_plus",
            },
            {
                "label": "common__rating-rx-label",
                "value": "rx",
            },
        ],
    }
};
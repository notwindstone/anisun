import {VariablesType} from "@/types/Config/Variables.type";

const MOVIE = "Фильм";
const MUSIC = "Клип";
const TV = "Сериал";
const OVA = "OVA";
const ONA = "ONA";
const SPECIAL = "Спецвыпуск";
const TV_SPECIAL = "TV Спецвыпуск";
const PV = "Проморолик";
const CM = "Реклама";

export const variables: VariablesType = {
    "imagePlaceholder": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAIAAABmX9r1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJkSURBVChTFctJTxNRAADgN29mOl2mi7R0gxYpNgLFBU2KKBAjAS9GjhoTb3rzz3gwXk2IiRduJhKIiWikIkYbYqkESulMd6bttNPZ37yqx+/wEW8PLBWBfHMgdi2kWV4KK5p1KcYsJUnTLJfKItk8Jp6vq4MB8FvdG1TunE6UiOF0ko4NQQiA1Oc73O/UhJeKOPCsrRDtfogmYnzP0MnQhLtvYrYiQaAa8TCj9HkqBTKVr+sV1I8huiCzwzdpUThrGv1xLzor7ztT/l+ZDDm/+nR3L5tvk1sfd0zXiN1SXFA1z3MhVmeKP7BcLdTqkEbts2Ied5UgIO4FKylvPc7Klj386uVrEAhyLdxuCOQM64xTNN3MVx2eK6vP/BOzoumwXRhVxerwECHrWJQsOLe8bPN6jkwoav381juzfBQNe3VHwHfx2jEvf/qWY51u2MHwc3avZQJs4J98kc/vEo0sU9oOudH23ianCK7SIekPs/li3eegluYuhxBfrnC1Hm782fG7kCgiJ0InnEgaOni0dvfhg5Va4WhsPK4JJ/HpW3NL93e+ZIT6OTBlHVLwMHeQmppcvJO2eYNVhfEsvNAQ5MqVelsNj4QTSXe3K1Mz6RBFA0XtxJIxY3QhGInsb7zZfL/B2H1Sp8OQRq2pk7NRt33IQ9gYVUe8pOuaRA0sEhIev88TiFCeUZsTkoura1NX5wuVpo7I0+z3yZEADUxI4UQioapSanoGWRqZvn19gDF3etzv9tqCgExNVXo9UVBkqdVqy7LcaDSIx09WNM1wOuwYWwCAfwEAPBgQ/wkpXTMBYP4CJN1Ov5yNZo0AAAAASUVORK5CYII=",
    "sorting": {
        "latest": {
            "label": "Все",
            "value": "latest"
        },
        "anons": {
            "label": "Анонсированные",
            "value": "anons"
        },
        "ongoing": {
            "label": "Выпускаются",
            "value": "ongoing"
        },
        "released": {
            "label": "Завершённые",
            "value": "released"
        },
    },
    "sortingAlternateTranslations": {
        "anons": {
            "singular": "Анонсированный",
            "withPrepositions": "Анонс на",
        },
        "ongoing": {
            "singular": "Выпускается",
            "withPrepositions": "Выпускается с",
        },
        "released": {
            "singular": "Завершённый",
            "withPrepositions": "Вышло",
        },
    },
    "settings": {
        "general": {
            "label": "Общее",
            "value": "general"
        },
        "about": {
            "label": "О сайте",
            "value": "about"
        },
        "account": {
            "label": "Аккаунт",
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
        "color": "var(--animeth-ripple-color)",
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
        "default": "Неизвестно",
    },
    "filters": {
        "order": [
            {
                "label": "Айди (по возрастанию)",
                "value": "id"
            },
            {
                "label": "Айди (по убыванию)",
                "value": "id_desc"
            },
            {
                "label": "Рейтинг",
                "value": "ranked"
            },
            {
                "label": "Тип",
                "value": "kind"
            },
            {
                "label": "Популярность",
                "value": "popularity"
            },
            {
                "label": "Название",
                "value": "name"
            },
            {
                "label": "Дата выхода",
                "value": "aired_on"
            },
            {
                "label": "Кол-во эпизодов",
                "value": "episodes"
            },
            {
                "label": "Статус",
                "value": "status"
            },
            {
                "label": "Случайно",
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
                "label": `${OVA}/${ONA}`,
                "value": "ova/ona",
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
                "label": "Короткий сериал",
                "value": "tv_13",
            },
            {
                "label": "Обычный сериал",
                "value": "tv_24",
            },
            {
                "label": "Длинный сериал",
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
                "label": "Зима",
                "value": "winter",
            },
            {
                "label": "Весна",
                "value": "spring",
            },
            {
                "label": "Лето",
                "value": "summer",
            },
            {
                "label": "Осень",
                "value": "fall",
            },
        ],
        "rating": [
            {
                "label": "Отсутствует",
                "value": "none",
            },
            {
                "label": "G",
                "value": "g",
            },
            {
                "label": "PG",
                "value": "pg",
            },
            {
                "label": "PG_13",
                "value": "pg_13",
            },
            {
                "label": "R-17",
                "value": "r",
            },
            {
                "label": "R+",
                "value": "r_plus",
            },
            {
                "label": "Rx",
                "value": "rx",
            },
        ],
        /* У shikimori нельзя получать информацию о всех студиях с помощью API.
         * Можно только спарсить страницу https://shikimori.one/studios, но
         * я не знаю как + мне лень, поэтому вручную вбил данные студий
         * которые часто мелькают в интернете (и ещё Studio Bind, потому что
         * реинкарнация безработного это база (кроме первой части второго сезона))
         */
        "studio": [
            {
                "label": "Studio Bind",
                "value": "1993",
            },
            {
                "label": "Bones",
                "value": "4",
            },
            {
                "label": "MAPPA",
                "value": "569",
            },
            {
                "label": "Ufotable",
                "value": "43",
            },
            {
                "label": "Production I.G",
                "value": "10",
            },
            {
                "label": "J.C.Staff",
                "value": "7",
            },
            {
                "label": "Wit Studio",
                "value": "858",
            },
            {
                "label": "Studio Ghibli",
                "value": "21",
            },
            {
                "label": "Studio Pierrot",
                "value": "1",
            },
            {
                "label": "Sunrise",
                "value": "14",
            },
            {
                "label": "White Fox",
                "value": "314",
            },
            {
                "label": "Madhouse",
                "value": "11",
            },
            {
                "label": "Kyoto Animation",
                "value": "2",
            },
            {
                "label": "Toei Animation",
                "value": "18",
            },
            {
                "label": "Trigger",
                "value": "803",
            },
            {
                "label": "Shaft",
                "value": "44",
            },
            {
                "label": "CloverWorks",
                "value": "1835",
            },
        ],
    }
};
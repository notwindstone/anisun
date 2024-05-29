import {VariablesType} from "@/types/Config/Variables.type";

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
        }
    },
    "iconProps": {
        "size": 32,
        "stroke": 1.5
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
        "tv": "Сериал",
        "movie": "Фильм",
        "ova": "OVA",
        "ona": "ONA",
        "special": "Спецвыпуск",
        "tv_special": "TV Спецвыпуск",
        "music": "Клип",
        "pv": "Проморолик",
        "cm": "Реклама",
        "default": "Неизвестно",
    }
};

<div align="center">

<img width="160" height="160" align="center" src="public/favicon.png">

# Animeth

### Сайт для просмотра аниме на основе Next.js и Mantine UI

<p align="center">
<a href="https://github.com/windstone-aristotle-yellow/animeth/blob/main/README_english.md">English</a> | <strong>Русский</strong>
</p>

</div>

[![GitHub Repo stars](https://img.shields.io/github/stars/windstone-aristotle-yellow/Animeth?label=Stars&style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/windstone-aristotle-yellow/Animeth/stargazers)
[![Telegram Channel](https://img.shields.io/badge/Telegram-КФПЛП-blue?style=flat&logo=telegram)](https://t.me/democracysucks)
[![Discord Server](https://img.shields.io/discord/1218281145138151430?label=Discord&labelColor=7289da&color=2c2f33&style=flat)](https://discord.gg/JhmkZDScfg)

## 📱 Скриншоты

<div>
<img src="public/Screenshot_animeth_videoplayer1.jpg" width="48%">
<img src="public/Screenshot_animeth_videoplayer2.jpg" width="48%">
</div>

## ⚙️ Набор технологий

* [Next.js](https://nextjs.org/) с использованием [TypeScript](https://www.typescriptlang.org/)

* [Mantine UI](https://mantine.dev/) в качестве UI-кита с [PostCSS](https://postcss.org/)

* [Drizzle ORM](https://orm.drizzle.team/) и [Neon Serverless DB](https://neon.tech/) для хранения данных

* [Tanstack Query](https://tanstack.com/query/latest) и [axios](https://axios-http.com/ru/docs/intro) для получения данных с API

* Слайдер аниме карточек на базе [Embla Carousel](https://www.embla-carousel.com) и [Mantine UI Carousel](https://mantine.dev/x/carousel/)

* [Clerk Auth](https://clerk.com/) для авторизации

* Плеер видео для [Anilibria API](https://github.com/anilibria/docs) на основе [Vidstack.js](https://www.vidstack.io/) и [HLS.js](https://github.com/video-dev/hls.js)

* [KodikWrapper](https://github.com/thedvxchsquad/kodikwrapper) для получения видеоплеера Kodik по Shikimori ID

* Система уведомлений на базе [Mantine UI Notifications](https://mantine.dev/x/notifications/)

* Форматирование даты и времени с помощью [Day.js](https://day.js.org/)

* Применение [CSS-модулей](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

## ⭐️ Возможности

* Просмотр аниме с субтитрами или озвучкой

* Загрузка аниме с торрента или напрямую через сайт

* Авторизация в аккаунт

* Система комментариев с бесконечной вложенностью, как на реддите

* Тёмная и светлая темы

> [!IMPORTANT]  
> В процессе заполнения...

## ✅ Список задач

- [ ] Добавить возможность загрузки аниме с торрента или напрямую через сайт

- [ ] Локализовать сайт с помощью [Internationalization (i18n) Routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)

- [ ] Прикрутить API от [SovetRomantica](https://github.com/sovetromantica/sr-api)

- [ ] Сделать различные роли (администратора, участника) для аккаунтов

## ⬇️ Запуск

### Локально

#### Подготовка

<details>
<summary>Раскрыть шаги</summary>

```bash
git clone https://github.com/windstone-aristotle-yellow/animeth
```

1. Переименуйте находящийся в корне приложения файл `.env.example` в `.env.local`

2. Зарегистрируйтесь на https://clerk.com

3. Зайдите в Панель управления (Dashboard) Clerk и создайте новое приложение

4. Перейдите в пункт **API Keys** в левом меню и скопируйте **Publishable key** (Пример: `pk_test_qwertyuiop1234567890`)

5. Вставьте **Publishable key** в строку `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` в файле `.env.local`

6. Перейдите в пункт **API Keys** в левом меню и скопируйте **Secret keys** (Пример: `sk_test_qwertyuiop1234567890`)

7. Вставьте **Publishable key** в строку `CLERK_SECRET_KEY` в файле `.env.local`

8. Зарегистрируйтесь на https://neon.tech/ и создайте там новый проект

9. Перейдите в Панель управления (Dashboard) Neon DB и скопируйте **Connection string** (Пример: `postgres://postgres:adminadmin@0.0.0.0:5432/db?sslmode=require`)

10. Вставьте **Connection string** в строку `NEON_DATABASE_URL` в файле `.env.local`

11. (Опционально) Если вы хотите смотреть аниме не только через плеер Animeth (который только с озвучкой Anilibria), но и через Kodik, то получите токен Kodik на http://kodik.cc/ (Вам нужно связаться с ними через email почту)

12. Запустите команду `npm install` для того, чтобы установить все зависимости

13. Готово!

</details>

> [!NOTE]
> Вот так должен выглядеть файл `.env.local` после всех махинаций выше

```text
NEON_DATABASE_URL='postgres://postgres:adminadmin@0.0.0.0:5432/db'
POSTGRESQL_DATABASE_URL='CHANGE_IT_postgres://postgres:adminadmin@0.0.0.0:5432/db'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_qwertyuiop1234567890
CLERK_SECRET_KEY=sk_test_qwertyuiop1234567890
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
KODIK_TOKEN='qwertyuiop1234567890'
```

#### Режим разработки

Если вы хотите запустить сайт в режиме разработки

```bash
npm run dev
```

#### Режим продакшна

> [!TIP]
> Запускайте сайт в этом режиме, если не знаете, какой выбрать

Если вы хотите запустить сайт в режиме продакшна

```bash
npm run build
```
```bash
npm run start
```

#### Ссылка на сайт

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы зайти на сайт

### Vercel

> [!IMPORTANT]  
> В процессе заполнения...

<details>
<summary>Раскрыть шаги</summary>

Пока что смотрите официальную документацию [Next.js deployment documentation](https://nextjs.org/docs/deployment)

</details>

## 💬 Контакты

### Напрямую

* [Telegram - @windst1](https://t.me/windst1)

* Discord - @notwindstone

### Через наш чат или сервер

* [Telegram - Клуб фанатов партии любителей пива](https://t.me/democracysucks)

* [Discord - Сага о сервере](https://discord.gg/JhmkZDScfg)

## ❤️ Особая благодарность

* [zvshka](https://github.com/zvshka) за оказание помощи при создании проекта

* [Shikimori](https://shikimori.one/api/doc/graphql), [Anilibria](https://github.com/anilibria/docs) и [Kodik](http://kodik.cc/) за их прекрасные API, без которых Animeth не смог бы работать

* [Sora](https://github.com/Khanhtran47/Sora) и [Sync for Reddit](https://github.com/laurencedawson/sync-for-reddit). Некоторые элементы дизайна были позаимствованы у них

* [Node-shikimori wrapper](https://github.com/Capster/node-shikimori). Некоторый код был позаимствован с этого враппера

## 📜 Лицензия

[![GitHub](https://img.shields.io/github/license/windstone-aristotle-yellow/Animeth?style=for-the-badge)](https://github.com/windstone-aristotle-yellow/Animeth/blob/main/LICENSE)

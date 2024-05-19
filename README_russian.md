<div align="center">

<img width="160" height="160" align="center" src="public/favicon.png">

# Animeth

### Сайт для просмотра аниме на основе Next.js и Mantine UI

<p align="center">
<a href="https://github.com/windstone-aristotle-yellow/animeth/blob/refactor/README.md">English</a> | <strong>Русский</strong>
</p>

</div>

[![GitHub Repo stars](https://img.shields.io/github/stars/windstone-aristotle-yellow/Animeth?label=Stars&style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/windstone-aristotle-yellow/Animeth/stargazers)
[![Telegram Channel](https://img.shields.io/badge/Telegram-КФПЛП-blue?style=flat&logo=telegram)](https://t.me/democracysucks)
[![Discord Server](https://img.shields.io/discord/1218281145138151430?label=Discord&labelColor=7289da&color=2c2f33&style=flat)](https://discord.gg/JhmkZDScfg)

> [!IMPORTANT]
> Сайт сейчас находится в процессе рефакторинга

## 📱 Скриншоты

<div align="center">
<img src="public/docs/Screenshot_animeth_videoplayer1.jpg" width="49%">
<img src="public/docs/Screenshot_animeth_videoplayer2.jpg" width="49%">
</div>

> [!NOTE]  
> Сайт ещё не доделан. Другие скриншоты появятся позже.

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

> [!NOTE]  
> В процессе заполнения...

## ✅ Список задач

- [ ] Добавить возможность выбирать базу данных в `.env.local`

- [ ] Добавить возможность загрузки аниме с торрента или напрямую через сайт

- [ ] Локализовать сайт с помощью [Internationalization (i18n) Routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)

- [ ] Прикрутить API от [SovetRomantica](https://github.com/sovetromantica/sr-api)

- [ ] Сделать различные роли (администратора, участника) для аккаунтов

## ⬇️ Запуск

### Локально

#### Подготовка

<details>
<summary>Раскрыть шаги</summary>

> Клонирование репозитория
> 
1. Клонируйте этот репозиторий, введя `git clone https://github.com/windstone-aristotle-yellow/animeth`

2. Переименуйте находящийся в корне приложения файл `.env.example` в `.env.local`

> Настройка Clerk auth

1. Зарегистрируйтесь на https://clerk.com

2. Зайдите в Панель управления (Dashboard) Clerk и создайте новое приложение

3. Перейдите в пункт **API Keys** в левом меню и скопируйте **Publishable key** (Пример: `pk_test_qwertyuiop1234567890`)

4. Вставьте **Publishable key** в строку `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` в файле `.env.local`

5. Перейдите в пункт **API Keys** в левом меню и скопируйте **Secret keys** (Пример: `sk_test_qwertyuiop1234567890`)

6. Вставьте **Publishable key** в строку `CLERK_SECRET_KEY` в файле `.env.local`

> Настройка базы данных: 1. Neon Serverless DB

Вы можете использовать Neon Serverless DB в качестве базы данных. Если вы собираетесь использовать локальный PostgreSQL, то перейдите к следующему этапу 

1. Зарегистрируйтесь на https://neon.tech/ и создайте там новый проект

2. Перейдите в Панель управления (Dashboard) Neon DB и скопируйте **Connection string** (Пример: `postgres://postgres:adminadmin@0.0.0.0:5432/db?sslmode=require`)

3. Вставьте **Connection string** в строку `NEON_DATABASE_URL` в файле `.env.local`

> (Не протестировано) Настройка базы данных: 2. Локальный PostgreSQL

Вы можете использовать локальный PostgreSQL в качестве базы данных. Если вы собираетесь использовать базу данных Neon Serverless, то перейдите к следующему этапу

1. Откройте файл `.env.local` и вставьте адрес базы данных в `POSTGRESQL_DATABASE_URL`

2. Поменяйте значение у `DATABASE_TYPE` с `NEON` на `POSTGRESQL` в файле `.env.local`

> Последние штрихи

1. (Необязательно) Если вы хотите смотреть аниме не только через плеер Animeth (который только с озвучкой Anilibria), но и через Kodik, то получите токен Kodik на http://kodik.cc/ (Вам нужно связаться с ними через email почту)

2. Запустите команду `npm install` для того, чтобы установить все зависимости

3. Готово!

</details>

> [!IMPORTANT]
> Вот так должен выглядеть файл `.env.local` после всех махинаций выше с конфигурацией базы данных Neon Serverless DB 

```text
DATABASE_TYPE='NEON'
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

> [!IMPORTANT]
> Вот так должен выглядеть файл `.env.local` после всех махинаций выше с конфигурацией базы данных локального PostgreSQL

```text
DATABASE_TYPE='POSTGRESQL'
NEON_DATABASE_URL='CHANGE_IT_postgres://postgres:adminadmin@0.0.0.0:5432/db'
POSTGRESQL_DATABASE_URL='postgres://postgres:adminadmin@0.0.0.0:5432/db'
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

<details>
<summary>Раскрыть шаги</summary>

Нажмите кнопку ниже:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fwindstone-aristotle-yellow%2Fanimeth)

Затем перейдите по **Project** -> **Settings** -> **Environment Variables** и создайте следующие переменные с ключом и значением:

1. `DATABASE_TYPE` - `NEON`

2. `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - `/`

3. `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - `/`

4. `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - `/sign-up`

5. `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - `/sign-in`

6. `CLERK_SECRET_KEY` - Ваш собственный **Secret key** с сайта https://clerk.com

7. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Ваш собственный **Publishable key** с сайта https://clerk.com

8. `NEON_DATABASE_URL` - Ваш собственный **Connection string** с сайта https://neon.tech/

9. (Необязательно) `KODIK_TOKEN` - Ваш собственный ключ с сайта http://kodik.cc/ (Вам нужно связаться с ними через email почту). Сайт может работать и без ключа, но в таком случае не будут показываться аниме с Kodik Player'ом

</details>

### Termux

Через andronix

> [!NOTE]  
> В процессе заполнения...

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

## 🌐 Ресурсы

* [Refactoring Hell](https://wiki.c2.com/?RefactoringHell)

* [Соглашение о коммитах](https://www.conventionalcommits.org/ru/v1.0.0/)

* [Realtime Colors](https://www.realtimecolors.com)

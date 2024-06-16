<div align="center">

<img width="160" height="160" align="center" src="public/favicon.png">

# Animeth

### Сайт для просмотра аниме на основе Next.js и Mantine UI

<p align="center">
<a href="https://github.com/notwindstone/animeth/blob/main/README.md">English</a> | <strong>Русский</strong>
</p>

</div>

[![GitHub Repo stars](https://img.shields.io/github/stars/notwindstone/Animeth?label=Stars&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/notwindstone/Animeth/stargazers)
[![Discord Server](https://img.shields.io/discord/1218281145138151430?label=Discord&labelColor=7289da&color=2c2f33&style=for-the-badge)](https://discord.gg/JhmkZDScfg)

## 📱 Скриншоты

<div align="center">
<img src="public/docs/Screenshot_animeth_main_screen_pc1.png" width="49%">
<img src="public/docs/Screenshot_animeth_main_screen_pc2.png" width="49%">
<img src="public/docs/Screenshot_animeth_main_screen_android1.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_main_screen_android2.jpg" width="32%">
</div>

### Больше скриншотов

<details>
<summary>Раскрыть</summary>

<div align="center">
<img src="public/docs/Screenshot_animeth_videoplayer1.jpg" width="49%">
<img src="public/docs/Screenshot_animeth_videoplayer2.jpg" width="49%">
<img src="public/docs/Screenshot_animeth_anime_page2.png" width="49%">
<img src="public/docs/Screenshot_animeth_anime_page1.png" width="49%">
<img src="public/docs/Screenshot_animeth_popular1.png" width="49%">
<img src="public/docs/Screenshot_animeth_search1.png" width="49%">
<img src="public/docs/Screenshot_animeth_account1.png" width="49%">
<img src="public/docs/Screenshot_animeth_main_settings1.png" width="49%">
<img src="public/docs/Screenshot_animeth_search_android1.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_anime_page_description_android1.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_settings_theme_android1.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_settings_about_android1.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_longCommentSection.jpg" width="32%">
<img src="public/docs/Screenshot_animeth_settings_account_android1.jpg" width="32%">
</div>

</details>

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

* Просмотр аниме с субтитрами или озвучкой (Kodik, SovetRomantica, Anilibria)

* Загрузка аниме с торрента или напрямую через сайт (.m3u8)

* Авторизация в аккаунт

* Система комментариев с бесконечной вложенностью, как на реддите

* Тёмная и светлая темы

* Поиск аниме с фильтрами

* Кастомная навигация с помощью router'а из Next.js для более быстрого перемещения между страницами

...и ещё много чего!

## ✅ Список задач

- [x] Добавить возможность выбирать базу данных в `.env.local`

- [x] Добавить возможность загрузки аниме с торрента или напрямую через сайт

- [x] Прикрутить API от [SovetRomanticaVideo](https://github.com/sovetromantica/sr-api)

- [x] Доделать страницу с поиском и фильтрами аниме

- [x] Доделать комментарии

- [x] Доделать страницу с популярными аниме

## ⬇️ Запуск

### Локально

#### Подготовка

<details>
<summary>Раскрыть шаги</summary>

> Клонирование репозитория

1. Клонируйте этот репозиторий, введя `git clone https://github.com/notwindstone/animeth`

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

4. Убедитесь, что в строке `DATABASE_TYPE` в файле `.env.local` стоит значение `NEON`

> Настройка базы данных: 2. Локальный PostgreSQL

Вы можете использовать локальный PostgreSQL в качестве базы данных. Если вы собираетесь использовать базу данных Neon Serverless, то пропустите этот этап

1. Откройте файл `.env.local` и вставьте адрес базы данных в `POSTGRESQL_DATABASE_URL`

2. Поменяйте значение у `DATABASE_TYPE` с `NEON` на `POSTGRESQL` в файле `.env.local`

> Последние штрихи

1. (Необязательно) Если вы хотите смотреть аниме не только через плеер Animeth (который только с озвучкой Anilibria), но и через Kodik, то получите токен Kodik на http://kodik.cc/ (вам нужно связаться с ними через email почту)

2. Запустите команду `npm install` для того, чтобы установить все зависимости

3. Создайте таблицу комментариев в базе данных с помощью команды `npx drizzle-kit push:pg`

4. Готово! Теперь вы можете запустить приложение

</details>

> [!IMPORTANT]
> Вот так должен выглядеть файл `.env.local` после всех махинаций выше с конфигурацией базы данных Neon Serverless DB 

```text
DATABASE_TYPE='NEON'
NEON_DATABASE_URL='postgres://postgres:adminadmin@0.0.0.0:5432/db'
POSTGRESQL_DATABASE_URL='CHANGE_IT_postgres://postgres:adminadmin@0.0.0.0:5432/db'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_qwertyuiop1234567890
CLERK_SECRET_KEY=sk_test_qwertyuiop1234567890
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
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
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
KODIK_TOKEN='qwertyuiop1234567890'
```

#### Разработки

Если вы хотите запустить сайт в режиме разработки

```bash
npm run dev
```

#### Продакшн

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

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fnotwindstone%2Fanimeth)

Затем перейдите по **Project** -> **Settings** -> **Environment Variables** и создайте следующие переменные с ключом и значением:

1. `DATABASE_TYPE` - `NEON`

2. `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - `/`

3. `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - `/`

4. `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - `/`

5. `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - `/`

6. `CLERK_SECRET_KEY` - ваш собственный **Secret key** с сайта https://clerk.com

7. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - ваш собственный **Publishable key** с сайта https://clerk.com

8. `NEON_DATABASE_URL` - ваш собственный **Connection string** с сайта https://neon.tech/

9. (Необязательно) `KODIK_TOKEN` - ваш собственный ключ с сайта http://kodik.cc/ (вам нужно связаться с ними через email почту). Сайт может работать и без ключа, но в таком случае не будут показываться аниме в Kodik Player'е

</details>

### Termux

<details>
<summary>Раскрыть шаги</summary>

1. Установите PRoot дистрибутив линукса, например, через Andronix

2. Установите Node.js, NPM и Git

3. Следуйте дальнейшим указаниям из пункта [локального запуска](#локально)

</details>

## 💬 Контакты

### Напрямую

* [Telegram - @windst1](https://t.me/windst1)

* [Discord - @notwindstone](https://discord.com/users/510709295814279168)

### Через наш чат или сервер

* [Discord - Сага о сервере](https://discord.gg/JhmkZDScfg)

## 🤝 Помочь с переводом

Помощь приветствуется!

> [!NOTE]
> To-Do: Hosted Weblate

## ⭐️ График роста кол-ва звёздочек

[![Star History Chart](https://api.star-history.com/svg?repos=notwindstone/animeth&type=Date)](https://star-history.com/#notwindstone/animeth&Date)

## ❤️ Особая благодарность

* [zvshka](https://github.com/zvshka) за оказание помощи при создании проекта

* cos (discord аккаунт) за оказание помощи в дизайне сайта

* [Shikimori](https://shikimori.one/api/doc/graphql), [Anilibria](https://github.com/anilibria/docs), [Kodik](http://kodik.cc/) и [SovetRomantica](https://sovetromantica.com/) за их прекрасные API, без которых Animeth не смог бы работать

* [Sora](https://github.com/Khanhtran47/Sora) и [Sync for Reddit](https://github.com/laurencedawson/sync-for-reddit). Некоторые элементы дизайна были позаимствованы у них

* [Node-shikimori wrapper](https://github.com/Capster/node-shikimori). Некоторый код был позаимствован с этого враппера

## 📜 Лицензия

[![GitHub](https://img.shields.io/github/license/notwindstone/Animeth?style=for-the-badge)](https://github.com/notwindstone/Animeth/blob/main/LICENSE)

## 🌐 Ресурсы

* [Refactoring Hell](https://wiki.c2.com/?RefactoringHell)

* [Соглашение о коммитах](https://www.conventionalcommits.org/ru/v1.0.0/)

* [Realtime Colors](https://www.realtimecolors.com)

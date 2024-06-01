<div align="center">

<img width="160" height="160" align="center" src="public/favicon.png">

# Animeth

### A web app for watching anime built with Next.js and Mantine UI

<p align="center">
<strong>English</strong> | <a href="https://github.com/windstone-aristotle-yellow/animeth/blob/main/README_russian.md">Русский</a>
</p>

</div>

[![GitHub Repo stars](https://img.shields.io/github/stars/windstone-aristotle-yellow/Animeth?label=Stars&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/windstone-aristotle-yellow/Animeth/stargazers)
[![Telegram Channel](https://img.shields.io/badge/Telegram-КФПЛП-blue?style=for-the-badge&logo=telegram)](https://t.me/democracysucks)
[![Discord Server](https://img.shields.io/discord/1218281145138151430?label=Discord&labelColor=7289da&color=2c2f33&style=for-the-badge)](https://discord.gg/JhmkZDScfg)

> [!IMPORTANT]
> The web app is currently in development

## 📱 Screenshots

<div align="center">
<img src="public/docs/Screenshot_animeth_videoplayer1.jpg" width="49%">
<img src="public/docs/Screenshot_animeth_videoplayer2.jpg" width="49%">
</div>

> [!NOTE]  
> Work in progress. More screenshots will be available soon.

## ⚙️ Tech Stack

* [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)

* [Mantine UI](https://mantine.dev/) and [PostCSS](https://postcss.org/) for UI

* [Drizzle ORM](https://orm.drizzle.team/) and [Neon Serverless DB](https://neon.tech/) for database

* [Tanstack Query](https://tanstack.com/query/latest) and [axios](https://axios-http.com/docs/intro) for fetching data from APIs

* Slider for anime cards based on [Embla Carousel](https://www.embla-carousel.com) and [Mantine UI Carousel](https://mantine.dev/x/carousel/)

* [Clerk Auth](https://clerk.com/) for auth

* Video player for [Anilibria API](https://github.com/anilibria/docs) based on [Vidstack.js](https://www.vidstack.io/) and [HLS.js](https://github.com/video-dev/hls.js)

* [KodikWrapper](https://github.com/thedvxchsquad/kodikwrapper) for fetching data from Kodik using Shikimori ID

* Notifications system based on [Mantine UI Notifications](https://mantine.dev/x/notifications/)

* Date formatting with [Day.js](https://day.js.org/)

* [CSS-modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

## ⭐ Features

* Watch anime with subtitles or dubbing (only on Russian language in  Kodik, SovetRomantica and Anilibria players)

* Download anime using torrent or directly from website (.m3u8)

* Account authentication

* Heavily nested comment system like on reddit

* Dark and light themes

> [!NOTE]  
> Work in progress...

## ✅ To-Do List

- [x] Add the option to `.env` to use a database based on value

- [x] Add option to download anime using torrent or directly from website

- [x] Add subtitles from [SovetRomanticaVideo API](https://github.com/sovetromantica/sr-api)

- [ ] Complete the page with anime search and filters

- [x] Finish comments

- [x] Complete the page with popular animes

## ⬇️ Self-Hosting

### Local

#### Preparations

<details>
<summary>Expand steps</summary>

> Cloning the repository

1. Clone this repository by running `git clone https://github.com/windstone-aristotle-yellow/animeth`

2. Rename the `.env.example` file in the root directory to `.env.local`

> Configuring Clerk auth

1. Sign up for a Clerk account at https://clerk.com

2. Go to the Clerk dashboard and create an application

3. Go to **API Keys** in your sidebar and copy **Publishable key** (Example: `pk_test_qwertyuiop1234567890`)

4. Paste your **Publishable key** to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the `.env.local` file

5. Go to **API Keys** in your sidebar and copy **Secret keys** (Example: `sk_test_qwertyuiop1234567890`)

6. Paste your **Publishable key** to `CLERK_SECRET_KEY` in the `.env.local` file

> Database configuration with: 1. Neon Serverless DB

You can use Neon Serverless DB as a database. If you are going to use local PostgreSQL database, then skip this configuration

1. Sign up to Neon DB at https://neon.tech/ to access serverless Postgres by creating a project

2. Go to the Neon dashboard and copy **Connection string** (Example: `postgres://postgres:adminadmin@0.0.0.0:5432/db?sslmode=require`)

3. Paste your **Connection string** to `NEON_DATABASE_URL` in the `.env.local` file

> (Didn't test yet) Database configuration with: 2. Local PostgreSQL

You can use local PostgreSQL as a database. If you are going to use Neon Serverless database, then skip this configuration

1. Go to the `.env.local` file and paste your connection string to `POSTGRESQL_DATABASE_URL`

2. Change `DATABASE_TYPE` to `POSTGRESQL` in the `.env.local` file

> Final steps

1. (Optional) If you want to watch anime in Kodik Player too, then obtain a token from http://kodik.cc/ (you need to contact them via email) Otherwise, only players based on the Anilibria API will work

2. Run `npm install` to install the required dependencies

3. Done! Your web app is ready to start

</details>

> [!IMPORTANT]
> This is what the `.env.local` file should look like with Neon Serverless DB configuration

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
> This is what the `.env.local` file should look like with PostgreSQL DB configuration

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

#### Development

If you want to run the application in development mode

```bash
npm run dev
```

#### Production

> [!TIP]
> Run the application in production mode if you don't know which to choose

If you want to run the application in production mode

```bash
npm run build
```
```bash
npm run start
```

#### Website URL

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Vercel

<details>
<summary>Expand steps</summary>

Click the button

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fwindstone-aristotle-yellow%2Fanimeth)

Navigate to **Project** -> **Settings** -> **Environment Variables** and then add values to the following keys:

1. `DATABASE_TYPE` - `NEON`

2. `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - `/`

3. `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - `/`

4. `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - `/sign-up`

5. `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - `/sign-in`

6. `CLERK_SECRET_KEY` - your own **Secret key** from https://clerk.com

7. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - your own **Publishable key** from https://clerk.com

8. `NEON_DATABASE_URL` - your own **Connection string** from https://neon.tech/

9. (Optional) `KODIK_TOKEN` - your own from http://kodik.cc/ (you need to contact them via email). This is needed only if you want to watch anime in Kodik Player too. Otherwise, only players based on the Anilibria API will work

</details>

### Termux

<details>
<summary>Expand steps</summary>

1. Install any PRoot Linux distro using an Andronix, for example

2. Install Node.js, NPM, and Git

3. Follow the next steps from the [local installation](#local) paragraph

</details>

## 💬 Contact

### Directly

* [Telegram - @windst1](https://t.me/windst1)

* Discord - @notwindstone

### Through our Telegram chat or Discord server

* [Telegram - Клуб фанатов партии любителей пива](https://t.me/democracysucks)

* [Discord - Сага о сервере](https://discord.gg/JhmkZDScfg)

## ❤️ Credits

* [zvshka](https://github.com/zvshka) for his help with project

* cos (discord account) for his help with UI

* [Shikimori](https://shikimori.one/api/doc/graphql), [Anilibria](https://github.com/anilibria/docs), [Kodik](http://kodik.cc/) and [SovetRomantica](https://sovetromantica.com/) for their wonderful APIs, without which Animeth could not work

* [Sora](https://github.com/Khanhtran47/Sora) and [Sync for Reddit](https://github.com/laurencedawson/sync-for-reddit). Some of the UI designs are borrowed from them

* [Node-shikimori wrapper](https://github.com/Capster/node-shikimori). Some of the codes are borrowed from them

## 📜 License

[![GitHub](https://img.shields.io/github/license/windstone-aristotle-yellow/Animeth?style=for-the-badge)](https://github.com/windstone-aristotle-yellow/Animeth/blob/main/LICENSE)

## 🌐 Cool resources

* [Refactoring Hell](https://wiki.c2.com/?RefactoringHell)

* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

* [Realtime Colors](https://www.realtimecolors.com)

<div align="center">

<img width="160" height="160" align="center" src="public/favicon.png">

# Animeth

### A web app for watching anime built with Next.js and Mantine UI

<p align="center">
<strong>English</strong> | <a href="https://github.com/windstone-aristotle-yellow/animeth/blob/main/README.md">Русский</a>
</p>

</div>

[![GitHub Repo stars](https://img.shields.io/github/stars/windstone-aristotle-yellow/Animeth?label=Stars&style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/windstone-aristotle-yellow/Animeth/stargazers)
[![Telegram Channel](https://img.shields.io/badge/Telegram-КФПЛП-blue?style=flat&logo=telegram)](https://t.me/democracysucks)
[![Discord Server](https://img.shields.io/discord/1218281145138151430?label=Discord&labelColor=7289da&color=2c2f33&style=flat)](https://discord.gg/JhmkZDScfg)

## 📱 Screenshots

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

* Watch anime with subtitles or dubbing

* Download anime using torrent or directly from website

* Account authentication

* Heavily nested comment system like on reddit

* Dark and light themes

> [!IMPORTANT]  
> Work in progress...

## ✅ To-Do List

- [ ] Add option to download anime using torrent or directly from website

- [ ] Localize website with [Internationalization (i18n) Routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)

- [ ] Add subtitles from [SovetRomantica API](https://github.com/sovetromantica/sr-api)

- [ ] Add permission groups (administrator, member) to users

## ⬇️ Self-Hosting

### Local

#### Preparations

<details>
<summary>Expand steps</summary>

```bash
git clone https://github.com/windstone-aristotle-yellow/animeth
```

To run the example locally, you need to:

1. Rename the `.env.example` file in the root directory to `.env.local`

2. Sign up for a Clerk account at https://clerk.com

3. Go to the Clerk dashboard and create an application

4. Go to **API Keys** in your sidebar and copy **Publishable key** (Example: `pk_test_qwertyuiop1234567890`)

5. Paste your **Publishable key** to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the `.env.local` file

6. Go to **API Keys** in your sidebar and copy **Secret keys** (Example: `sk_test_qwertyuiop1234567890`)

7. Paste your **Publishable key** to `CLERK_SECRET_KEY` in the `.env.local` file

8. Sign up to Neon DB at https://neon.tech/ to access serverless Postgres by creating a project

9. Go to the Neon dashboard and copy **Connection string** (Example: `postgres://postgres:adminadmin@0.0.0.0:5432/db?sslmode=require`)

10. Paste your **Connection string** to `NEON_DATABASE_URL` in the `.env.local` file

11. (Optional) If you want to watch anime in Kodik Player too, then obtain a token from http://kodik.cc/ (you need to contact them via email) Otherwise, only players based on the Anilibria API will work

12. Run `npm install` to install the required dependencies

13. Done! Your web app is ready to start

> [!NOTE]
> This is what the `.env.local` file should look like after all the changes above

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

</details>

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

> [!IMPORTANT]  
> Work in progress...

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for now

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

* [Shikimori](https://shikimori.one/api/doc/graphql), [Anilibria](https://github.com/anilibria/docs) and [Kodik](http://kodik.cc/) for their wonderful APIs, without which Animeth could not work

* [Sora](https://github.com/Khanhtran47/Sora) and [Sync for Reddit](https://github.com/laurencedawson/sync-for-reddit). Some of the UI designs are borrowed from them

* [Node-shikimori wrapper](https://github.com/Capster/node-shikimori). Some of the codes are borrowed from them 

## 📜 License

[![GitHub](https://img.shields.io/github/license/windstone-aristotle-yellow/Animeth?style=for-the-badge)](https://github.com/windstone-aristotle-yellow/Animeth/blob/main/LICENSE)
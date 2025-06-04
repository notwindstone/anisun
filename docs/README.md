<div align="center">

<img width="160" height="160" align="center" src="../public/favicon.webp" alt="Favicon">

# [anisun (rebooted)](https://anime.tatar)

A web app for watching anime written in next.js with speed in mind 

<p align="center">
<strong>English</strong> | <a href="https://github.com/notwindstone/anisun/blob/main/README_russian.md">Русский</a>
</p>

[![GitHub Repo stars](https://img.shields.io/github/stars/notwindstone/Anisun?label=Stars&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/notwindstone/Anisun/stargazers)

</div>

## 📱 Screenshots

<div align="center">
<img src="../public/screenshots/home-page-desktop.webp" width="49%" alt="Home page desktop screenshot (desktop, dark theme)">
<img src="../public/screenshots/home-page-desktop-light.webp" width="49%" alt="Home page desktop screenshot (desktop, light theme)">
<img src="../public/screenshots/home-page-mobile.webp" width="32%" alt="Home page desktop screenshot (mobile, dark theme)">
<img src="../public/screenshots/home-page-mobile-light.webp" width="32%" alt="Home page desktop screenshot (mobile, light theme)">
</div>

### More screenshots

<details>
<summary>Expand</summary>

<div align="center">
</div>

</details>

## ⚡ Performance

* Using as few libraries as possible
* React Suspense for the seamless UI streaming
* Data caching both on the server (using [LRU cache](https://www.npmjs.com/package/quick-lru) & Next.js internal cache) and client
* Optimized [React Contexts](https://www.npmjs.com/package/use-context-selector)
* User config management using cookies for the instant config load
* Preferring CSS over JS styles
* Memoizing only those components that truly need it
* Using Server Actions instead of API routes when possible
* Image optimization (built-in [sharp](https://www.npmjs.com/package/sharp) & specified properties) and caching for the home page
* Sidebar & mobile navbar routes prefetching 

...and a lot of other optimizations

### PageSpeed Insights

<details>
<summary>Expand</summary>

<div align="center">
<img src="../public/psi/psi-desktop-audit.webp" alt="PageSpeed Insights Audit screenshot (97 points out of 100 for performance)">
</div>

</details>

### Web page size

<details>
<summary>Expand</summary>

<div align="center">
<img src="../public/psi/web-page-size.webp" alt="">
</div>

</details>

## ⭐ Features

* Extension-based
* Seamless Anilist, Shikimori and MAL integration
* Localization

## ⚙️ Tech Stack

* [Next.js 15](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
* [TailwindCSS](https://tailwindcss.com/) for the UI
* An async state management using [Tanstack Query](https://tanstack.com/query/latest)
* [Mantine Hooks](https://mantine.dev/hooks/package/) for general usage on the frontend
* Fetching the data from Kodik (an anime media database) thanks to [KodikWrapper](https://github.com/thedvxchsquad/kodikwrapper)
* A video player based on [Vidstack.js](https://www.vidstack.io/) and [HLS.js](https://github.com/video-dev/hls.js)
* [Quick LRU](https://www.npmjs.com/package/quick-lru) for the in-memory cache
* OAuth2 authorization using [arctic.js](https://arcticjs.dev/)

## ⬇️ Self-Hosting

### Vercel

<details>
<summary>Expand steps</summary>

Click the button

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fnotwindstone%2Fanisun)

Navigate to **Project** -> **Settings** -> **Environment Variables** and then add values to the following keys:

1. `NODE_ENV` = `production`
2. `HOST_URL` = `https://your-domain-here.vercel.app`

3. (Optional) `SHIKIMORI_CLIENT_ID` = `yourOwnOAuth2ClientID` - only if you want to enable integration with Shikimori
4. (Optional) `SHIKIMORI_SECRET_KEY` = `yourOwnOAuth2SecretKey` - only if you want to enable integration with Shikimori

5. (Optional) `ANILIST_CLIENT_ID` = `yourOwnOAuth2ClientID` - only if you want to enable integration with Anilist
6. (Optional) `ANILIST_SECRET_KEY` = `yourOwnOAuth2SecretKey` - only if you want to enable integration with Anilist

7. (Optional) `MAL_CLIENT_ID` = `yourOwnOAuth2ClientID` - only if you want to enable integration with MyAnimeList
8. (Optional) `MAL_SECRET_KEY` = `yourOwnOAuth2SecretKey` - only if you want to enable integration with MyAnimeList

9. (Optional) `NEXT_PUBLIC_KODIK_TOKEN` = `yourOwnPublicKey` - get your own token from http://kodik.cc/ (you need to contact them via email). Only if you want to enable the Kodik player

Note: LRU cache might not work as expected, because serverless environments tend to spin down on low load.

</details>

### Local

If you don't want to use a vercel/netlify/other serverless environment.

#### Preparations

<details>
<summary>Expand steps</summary>

You need to install:

- Node.js
- A package manager for node.js (e.g. [bun](https://bun.sh/))
- Git

After successful installation clone this repository by running:

```bash
git clone https://github.com/notwindstone/anisun
```

Now you can install all project dependencies with `bun i`

</details>

#### Development

You can run this app in development mode using `bun dev`

It will be much slower than the production build, because development mode is intended to use only for development, it builds everything on-demand and supports Hot Module Replacement (HMR).

#### Termux

To run this project in development mode, use `bun run dev:termux`

#### Production

Build this app by running `bun run build`

Now you can start it by `bun run start`

But it is not production-ready yet. You need to install a reverse-proxy like Caddy first.

After you installed Caddy, you need to rename `Caddyfile.example` in the root of repository to `Caddyfile` and change `example.com` in the file to your domain (`anime.tatar` in my case). Then just restart it by running `caddy stop` and `caddy start` in the terminal.

Be sure you are running `caddy start` in the repository directory, otherwise it Caddy will not use your configuration file.

## 💬 Contact

### Directly

* [Telegram - @windst1](https://t.me/windst1)
* [Discord - @notwindstone](https://discord.com/users/510709295814279168)

### Through our Discord server

* [Discord - department of type safety](https://discord.gg/JhmkZDScfg)

## 🤝 Contributing

Contributions are welcome! Check [CONTRIBUTING.md](CONTRIBUTING.md)

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=notwindstone/anisun&type=Date)](https://star-history.com/#notwindstone/anisun&Date)

## ❤️ Credits

* [zvshka](https://github.com/zvshka) for his help with the project
* `cos` for his help with the UI
* [Kodik](http://kodik.cc/)
* [Anilist API](https://docs.anilist.co/)
* [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2)
* [Shikimori API](https://shikimori.one/api/doc/graphql)
* [Consumet API](https://github.com/consumet/api.consumet.org)
* [Anilibria API](https://github.com/anilibria/docs)
* [SovetRomantica API](https://sovetromantica.com/)

## 📜 License

[![GitHub](https://img.shields.io/github/license/notwindstone/Anisun?style=for-the-badge)](https://github.com/notwindstone/Anisun/blob/main/LICENSE)

## ❗ Disclaimer

> [!IMPORTANT]
> Anisun does not host any files, it merely links to 3rd party services.
> Legal issues should be taken up with the file hosts and providers.
> Anisun is not responsible for any media files shown by the video providers.

## To-Do

ask about using this logo

https://x.com/ahiru_tokotoko/status/1568517301737242625

* Shikimori, MAL and AniList integrations

https://github.com/consumet/api.consumet.org

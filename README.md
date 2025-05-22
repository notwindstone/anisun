<div align="center">

<img width="160" height="160" align="center" src="public/favicon.webp" alt="Favicon">

# [anisun (rebooted)](https://anime.tatar)

A web app for watching anime built with next.js

<p align="center">
<strong>English</strong> | <a href="https://github.com/notwindstone/anisun/blob/main/README_russian.md">Русский</a>
</p>

[![GitHub Repo stars](https://img.shields.io/github/stars/notwindstone/Anisun?label=Stars&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/notwindstone/Anisun/stargazers)

</div>

## 📱 Screenshots

<div align="center">
<img src="public/screenshots/home-page-desktop.webp" width="49%" alt="Home page desktop screenshot (desktop, dark theme)">
<img src="public/screenshots/home-page-desktop-light.webp" width="49%" alt="Home page desktop screenshot (desktop, light theme)">
<img src="public/screenshots/home-page-mobile.webp" width="32%" alt="Home page desktop screenshot (mobile, dark theme)">
<img src="public/screenshots/home-page-mobile-light.webp" width="32%" alt="Home page desktop screenshot (mobile, light theme)">
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
<img src="public/psi/psi-desktop-audit.webp" alt="PageSpeed Insights Audit screenshot (97 points out of 100 for performance)">
</div>

</details>

### Web page size

<details>
<summary>Expand</summary>

<div align="center">
<img src="public/psi/web-page-size.webp" alt="">
</div>

</details>

## ⭐ should be the features in the future

* Seamless Anilist, Shikimori and MAL integration
* Kodik, Anilibria, Sovetromantica, Consumet APIs for the media streaming
* Localization


## ⚙️ Tech Stack

* [Next.js 15](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
* [TailwindCSS](https://tailwindcss.com/) for the UI
* An async state management using [Tanstack Query](https://tanstack.com/query/latest)
* [Mantine Hooks](https://mantine.dev/hooks/package/) for general usage on the frontend
* Fetching the data from Kodik (an anime media database) thanks to [KodikWrapper](https://github.com/thedvxchsquad/kodikwrapper)
* A video player based on [Vidstack.js](https://www.vidstack.io/) and [HLS.js](https://github.com/video-dev/hls.js)
* [Quick LRU](https://www.npmjs.com/package/quick-lru) for the in-memory cache

## ⬇️ Self-Hosting

### Local

#### Preparations

#### Development

#### Production

running this app with `bun run build` & `bun run start` is not enough.

You need to install a reverse-proxy like Caddy.

#### Website URL

### Vercel

### Termux

## 💬 Contact

### Directly

* [Telegram - @windst1](https://t.me/windst1)

* [Discord - @notwindstone](https://discord.com/users/510709295814279168)

### Through our Discord server

* [Discord - department of type safety](https://discord.gg/JhmkZDScfg)

## 🤝 Contributing

Contributions are welcome!

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=notwindstone/anisun&type=Date)](https://star-history.com/#notwindstone/anisun&Date)

## ❤️ Credits

## 📜 License

## ❗ Disclaimer

> [!IMPORTANT]
> Anisun does not host any files, it merely links to 3rd party services.
> Legal issues should be taken up with the file hosts and providers.
> Anisun is not responsible for any media files shown by the video providers.


> [!IMPORTANT]
> Work in progress...

credits for logo

https://x.com/ahiru_tokotoko/status/1568517301737242625

## To-Do

* Shikimori, MAL and AniList integrations
* Next.js 15 for frontend
* Rewrite everything
* more

https://github.com/consumet/api.consumet.org

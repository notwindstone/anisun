import { Elysia } from "elysia";

const ip = new Elysia()
    .derive(
        { as: 'global' },
        ({ server, request }) => ({
            ip: server?.requestIP(request)
        })
    )
    .get('/ip', ({ ip }) => ip)

const server = new Elysia()
    .use(ip)
    .get('/ip', ({ ip }) => ip)

const app = new Elysia().get("/", () => {
    return {
        data: "Hello Elysia",
    }
}).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

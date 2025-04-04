import { Elysia, t } from "elysia";

export const messageController = new Elysia({ prefix: '/message' })
    .get('/', () => {
        const data = [];

        for (let _ = 0; _ < Math.pow(10, 5); _++) {
            data.push(Math.random());
        }

        return {
            message: 'Hello From Elysia 🦊',
            data: data,
        };
    })
    .get('/:message', ({ params }) => {
        const data = [];

        for (let _ = 0; _ < Math.pow(10, 5); _++) {
            data.push(Math.random());
        }

        return {
            message: `Your Message: ${params.message} 🦊`,
            data: data,
        };
    }, { params: t.Object({ message: t.String() }) })
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String(),
        }),
    });
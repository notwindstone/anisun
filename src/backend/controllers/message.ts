import { Elysia, t } from "elysia";

export const messageController = new Elysia({ prefix: '/message' })
    .get('/', () => {
        return {
            message: 'Hello From Elysia 🦊',
        };
    })
    .get('/:message', ({ params }) => {
        return {
            message: `Your Message: ${params.message} 🦊`,
        };
    }, { params: t.Object({ message: t.String() }) })
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String(),
        }),
    });
import { Elysia, t } from "elysia";

export const messageController = new Elysia({ prefix: '/message' })
    .get('/', () => 'Hello From Elysia 🦊')
    .get('/:message', ({ params }) => {
        return {
            text: `Your Message: ${params.message} 🦊`,
        };
    },  { params: t.Object({ message: t.String() }) })
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String(),
        }),
    });
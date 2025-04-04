import { Elysia } from 'elysia'
import {APIRoutes} from "@/constants/routes";
import {messageController} from "@/backend/controllers/message";

export const elysiaApp = new Elysia({ prefix: APIRoutes.Root }).use(messageController).onError(({ code, error }) => {
    console.log(code);

    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 })
});
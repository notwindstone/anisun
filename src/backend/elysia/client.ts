import { treaty } from '@elysiajs/eden';
import { ElysiaAppType } from "@/types/backend/elysia/ElysiaApp.type";

const url = process.env.URL_DOMAIN ?? "localhost:3000";
export const elysia = treaty<ElysiaAppType>(url);
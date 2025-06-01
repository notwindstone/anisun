import 'dotenv/config';
import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
    dbCredentials: {
        url: process.env.SQLITE_PATH!,
    },
    dialect: "sqlite",
    schema:  "./src/db/schema.ts",
    out:     "./drizzle",
});

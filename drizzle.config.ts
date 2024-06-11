import "dotenv/config";
import type { Config } from "drizzle-kit";
import {config} from "dotenv";

config({ path: ".env.local" });

const dbType = process.env.DATABASE_TYPE!;
let dbConnectionString;

switch (dbType.toLowerCase()) {
    case "neon": {
        dbConnectionString = process.env.NEON_DATABASE_URL!;
        break;
    }
    case "postgresql": {
        dbConnectionString = process.env.POSTGRESQL_DATABASE_URL!;
        break;
    }
    default: {
        dbConnectionString = process.env.NEON_DATABASE_URL!;
        break;
    }
}

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: dbConnectionString,
    },
} satisfies Config;
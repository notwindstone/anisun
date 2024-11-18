import "dotenv/config";
import type { Config } from "drizzle-kit";
import {config} from "dotenv";

config({ path: ".env.local" });

const dbType = process.env.DATABASE_TYPE!;
let dbConnectionString: string;
let driver: "pg" | "mysql2";

switch (dbType.toLowerCase()) {
    case "neon": {
        dbConnectionString = process.env.NEON_DATABASE_URL!;
        driver = "pg";
        break;
    }
    case "postgresql": {
        dbConnectionString = process.env.POSTGRESQL_DATABASE_URL!;
        driver = "pg";
        break;
    }
    case "mysql": {
        dbConnectionString = process.env.MYSQL_DATABASE_URL!;
        driver = "mysql2";
        break;
    }
    default: {
        throw new Error(`Unsupported database type: ${dbType}`);
    }
}

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: driver,
    dbCredentials: {
        uri: dbConnectionString,
        connectionString: dbConnectionString,
    },
} satisfies Config;
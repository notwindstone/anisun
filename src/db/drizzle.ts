import { Pool } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import postgres from "postgres";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";

const dbType = process.env.DATABASE_TYPE!;
let db;

switch (dbType.toLowerCase()) {
    case "neon": {
        const pool = new Pool({connectionString: process.env.NEON_DATABASE_URL});
        db = drizzleNeon(pool);
        break;
    }
    case "postgresql": {
        const queryClient = postgres(process.env.POSTGRESQL_DATABASE_URL!);
        db = drizzlePostgres(queryClient);
        break;
    }
}

export default db;
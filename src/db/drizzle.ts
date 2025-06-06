import postgres from "postgres";
//import mysql from "mysql2/promise";
//import { drizzle as drizzleMySQL, MySql2Database } from "drizzle-orm/mysql2";
import { Pool } from '@neondatabase/serverless';
import { drizzle as drizzleNeon, NeonDatabase } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres, PostgresJsDatabase } from "drizzle-orm/postgres-js";
//import { drizzle as drizzleSqlite, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
//import Database from "better-sqlite3";

const dbType = process.env.DATABASE_TYPE!;
//let db: NeonDatabase | PostgresJsDatabase | MySql2Database | BetterSQLite3Database;
let db: NeonDatabase | PostgresJsDatabase;

switch (dbType.toLowerCase()) {
    case "neon": {
        const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });
        db = drizzleNeon(pool);
        break;
    }
    case "postgresql": {
        const queryClient = postgres(process.env.POSTGRESQL_DATABASE_URL!);
        db = drizzlePostgres(queryClient);
        break;
    }
    /*case "mysql": {
        const pool = mysql.createPool(process.env.MYSQL_DATABASE_URL!);
        db = drizzleMySQL(pool);
        break;
    }
    case "sqlite": {
        db = drizzleSqlite(new Database(process.env.SQLITE_DATABASE_URL!));
        break;
    }*/
    default: {
        throw new Error(`Unsupported database type: ${dbType}`);
    }
}

export default db;
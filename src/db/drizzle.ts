// /*
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });

const db = drizzle(pool);
// */

/*
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const queryClient = postgres(process.env.POSTGRESQL_DATABASE_URL!);
const db = drizzle(queryClient);
*/

export default db
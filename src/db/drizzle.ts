import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://animethdb_owner:IUHWXN3PcYh0@ep-solitary-recipe-a28c11lv.eu-central-1.aws.neon.tech/animethdb?sslmode=require");

const db = drizzle(sql);

export default db;
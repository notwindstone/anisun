import { drizzle } from 'drizzle-orm/libsql';

const database = drizzle(process.env.SQLITE_PATH!);

export default database;

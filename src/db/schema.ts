import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const MALToAnilibriaSchema = sqliteTable('malToAnilibria', {
    idMal:       integer().notNull().unique(),
    idAnilibria: integer().notNull(),
});
export const MALToSovetRomanticaSchema = sqliteTable('malToSovetRomantica', {
    idMal:            integer().notNull().unique(),
    idSovetRomantica: integer().notNull().unique(),
});

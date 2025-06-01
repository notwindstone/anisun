import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const MALToAnilibriaSchema = sqliteTable('malToAnilibria', {
    idMal:       integer().notNull(),
    idAnilibria: integer().notNull(),
});
export const MALToSovetRomanticaSchema = sqliteTable('malToSovetRomantica', {
    idMal:            integer().notNull(),
    idSovetRomantica: integer().notNull(),
});

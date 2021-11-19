import { createConnection } from "./connectSqlite.js";

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS projects");

    const gamesTableSchema = `
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            genre TEXT,
            price DOUBLE
        )
    `;

    await connection.exec(gamesTableSchema);
})()
import { createConnection } from "./connectSqlite.js";

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS projects");

    const gamesTableSchema = `
        CREATE TABLE projects (
            id int(11) NOT NULL,
            name varchar(50) NOT NULL,
            category varchar(255) NOT NULL,
            tech varchar(100) NOT NULL
        )
    `;

    await connection.exec(gamesTableSchema);
})()
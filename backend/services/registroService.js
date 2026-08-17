import pool from "../db.js";

export async function registrarUtilizador(username, password) {
    const resultado = await pool.query(
        `INSERT INTO users (username, password)
         VALUES ($1, $2)
         RETURNING id, username`,
        [username, password]
    );
    console.log("resultado: ", resultado.rows);

    return resultado.rows[0];
}
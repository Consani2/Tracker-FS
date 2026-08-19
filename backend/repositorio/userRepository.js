import pool from "../db.js";

//Retorna objeto user: id, username
export async function criarUtilizador(username, senha){
    return await pool.query(
        `INSERT INTO users (username, password)
         VALUES ($1, $2)
         RETURNING id, username`,
        [username, senha]
    );
}
export async function findByName(username){
    const resultado =  await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    );
    if (resultado.rows.length === 0){
        return false
    }
    else {
        return resultado.rows[0];
    }
}
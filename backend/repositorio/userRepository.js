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

export async function adicionarSerieLista(userId, id_serie, dados_serie){
    let resultado = await pool.query(
        `SELECT * FROM user_series 
         WHERE user_id = $1 
           AND series_id = $2`,
        [userId, id_serie]
    )
    if (resultado.rows.length === 0){
        resultado = await pool.query(
            `INSERT INTO user_series (user_id, series_id, dados_serie) 
             VALUES ($1, $2, $3)`,
            [userId, id_serie, dados_serie]
        )
    }
    return resultado.rows[0];
}
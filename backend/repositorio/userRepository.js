import pool from "../db.js";
import {adicionarSerie, findSerieById} from "./serieRepository.js";

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

/**
 *
 * @param userId
 * @param id_serie
 * @param dados_serie
 * @returns {Promise<*>}
 */
export async function adicionarSerieLista(userId, id_serie, dados_serie, eps_por_temporada){

    let resultado = await findSerieById(id_serie);

    if(!resultado){
        await adicionarSerie(id_serie, dados_serie);
    }
    console.log(eps_por_temporada)
    const eps_temporada = {
        temporada: eps_por_temporada.temporada,
        episodios: eps_por_temporada.total_episodios
    }
    //console.log("Ep temporada em adicionarserielista",eps_temporada)
    const ep_assistidos = eps_temporada.episodios_assistidos;

    let query = await pool.query(
        `SELECT * FROM user_series 
         WHERE user_id = $1 
           AND series_id = $2`,
        [userId, id_serie]
    )
    if (query.rows.length === 0){
        query = await pool.query(
            `INSERT INTO user_series (user_id, series_id, dados_serie, eps_por_temporada, eps_assistidos) 
             VALUES ($1, $2, $3, $4, $5)`,
            [userId, id_serie, dados_serie, {eps_temporada}, ep_assistidos]
        )
    }
    return query.rows[0];
}
export async function findUserById(user_id){
    const resultado = await pool.query(
        `SELECT id, username FROM users WHERE id = $1`,
        [user_id]
    )
    if (resultado.rows.length === 0){
        throw new Error("Utilizador não encontrado");
    }
    return resultado.rows[0];
}
export async function obterUserSeries(user_id){
    //console.log("User id," , user_id);
    const query = await pool.query(
        `SELECT * FROM user_series 
         WHERE user_id = $1 `,
        [user_id]
    )
    //console.log(query.rows);
    if (query.rows.length === 0){
        throw new Error("Não há séries na lista.")
    }
    return query.rows;
}
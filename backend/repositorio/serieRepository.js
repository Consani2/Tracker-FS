import pool from "../db.js";

export async function adicionarSerie(serie_id, dados_serie, ){
    //console.log("Serie: ", serie);
    console.log("NOME DADOS SÉRIE BD: ", dados_serie.name)
    const resultado = await pool.query(
        `INSERT INTO series VALUES($1, $2, $3)`,
        [serie_id, dados_serie.name, {dados_serie}]
    )
    return resultado.rows[0]
}

export async function findSerieById(serie_id){
    let resultado = await pool.query(
        `SELECT * FROM series 
         WHERE id = $1`,
        [serie_id]
    )
    if (resultado.rows.length === 0){
        return false;
    }
    else {
        return resultado.rows[0];
    }
}

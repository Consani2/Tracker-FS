import pool from "./db.js";

async function testarConexao() {
    try {
        const resultado = await pool.query("SELECT NOW()");
        console.log("Conexão bem-sucedida!");
        console.log(resultado.rows[0]);
    } catch (erro) {
        console.error("Erro ao conectar:", erro);
    } finally {
        await pool.end();
    }
}

testarConexao();
import {criarUtilizador} from "../repositorio/userRepository.js";

/**
 * @param {string} username - Username do utilizador.
 * @param {string} password - Senha Utilizador
 * @returns {{ id: number, username: string }} Objeto do utilizador.
 */
export async function registrarUtilizador(username, password) {
    const resultado = await criarUtilizador(username, password);

    console.log("resultado: ", resultado.rows);

    return resultado.rows[0];
}
//o


//TODO: Adicionar lógica de verificação login
export async function logar(username, senha){

}
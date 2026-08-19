import {criarUtilizador, findByName} from "../repositorio/userRepository.js";

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


/**
 * Autentica um utilizador através do nome de utilizador e da palavra-passe.
 *
 * @param {string} username - Nome de utilizador utilizado para localizar a conta.
 * @param {string} senha - Palavra-passe fornecida para autenticação.
 * @returns {Promise<{
 *     id: number,
 *     username: string
 * }>} Dados do utilizador autenticado.
 * @throws {Error} Se o utilizador não for encontrado.
 * @throws {Error} Se a palavra-passe fornecida for inválida.
 */
export async function logar(username, senha){
    const user = await findByName(username);
    console.log("resultado: ", user);
    if(!user){
        throw new Error("Utilizador não encontrado");
    }
    if(user && senha === user.password){
        return user;
    }
}
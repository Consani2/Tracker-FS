import {adicionarSerieLista} from "../repositorio/userRepository.js";

export async function adicionarSerie(userId, id_serie, dados_serie) {
    return await adicionarSerieLista(userId, id_serie, dados_serie)
}
import {adicionarSerieLista} from "../repositorio/userRepository.js";


export async function adicionarSerie(userId, id_serie, dados_serie) {
    try{
        return await adicionarSerieLista(userId, id_serie, dados_serie)
    } catch (erro){
        console.log("Falha ao adicionar série a lista! Erro: ", erro.message)
    }

}
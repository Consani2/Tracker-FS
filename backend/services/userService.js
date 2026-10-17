import {
    adicionarEpRepository,
    adicionarSerieLista,
    findUserById, obterEpsAssistidosRepository,
    obterUserSeries, removerEpRepository,
    removerSerieLista
} from "../repositorio/userRepository.js";
import {obterEpsAssistidosAPI} from "../../frontend/src/services/userService.js";


export async function adicionarSerie(userId, id_serie, dados_serie) {
    try{
        return await adicionarSerieLista(userId, id_serie, dados_serie)
    } catch (erro){
        console.log("Falha ao adicionar série a lista! Erro: ", erro.message)
    }

}
export async function removerSerie(idUser, idSerie){
    try {
        return await removerSerieLista(idUser, idSerie);
    }catch (erro){
        console.log("Falha ao remover série da BD. Erro: ", erro.message);
    }

}
export async function obterUtilizador(user_id){
    try {
        return await findUserById(user_id);
    } catch (err){
        console.log(err);
    }
}
export async function obterListaSeries(userId){
    return await obterUserSeries(userId);
}
export async function adicionarEpAssistido (userId, serieId, temp, ep){
    try {
        return await adicionarEpRepository(userId, serieId, temp, ep);
    } catch (erro){
        console.log("ERROR: ", erro.message)
    }
}
export async function removerEpAssistido(userId, serieId, temp, ep){
    try {
        return await removerEpRepository(userId, serieId, temp, ep);

    } catch (erro) {
        console.log("ERROR: ", erro.message)
    }
}
export async function obterEpsAssistidos(userId, serieId){
    const dados = await obterEpsAssistidosRepository(userId, serieId);
    //console.log("DADOS: ", dados)
    return dados;
}
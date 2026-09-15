import {adicionarSerieLista, findUserById, obterUserSeries} from "../repositorio/userRepository.js";


export async function adicionarSerie(userId, id_serie, dados_serie, eps_por_temporada) {
    try{
        console.log("User Service: ", dados_serie.name)
        return await adicionarSerieLista(userId, id_serie, dados_serie, eps_por_temporada)
    } catch (erro){
        console.log("Falha ao adicionar série a lista! Erro: ", erro.message)
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
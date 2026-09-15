import express from "express";
import {adicionarSerie, obterListaSeries, obterUtilizador} from "../services/userService.js";
import {obterUtilizadorLogado} from "../../frontend/src/services/userService.js";
import {findSerieById} from "../repositorio/serieRepository.js";


const router = express.Router()
//TODO: Continuar implementando salvar série "Minha Lista" na base de dados.
router.post("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId
    const {serie_id} = req.params;
    //console.log(userId);
    console.log("BODY: ", req.body)
    //console.log("User id: ", userId);
    const dados_serie = req.body
    console.log("Eps. por Temp:  ", dados_serie.eps_por_temporada)
    //console.log("Tipo dados_serie: ", typeof dados_serie);
    await adicionarSerie(userId, serie_id, dados_serie);
    res.status(200).json({
        success: true,
        mensagem: `Série ${dados_serie.name} adicionada com sucesso!`
    })
})
router.get("/user/me", async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({
            autenticado: false
        })
    }
    const user = await obterUtilizador(req.session.userId);
    res.status(200).json(user);
    //console.log("User: ", user)
})
router.get("/user/series", async (req, res) => {
    const userId = req.session.userId

    if(!userId){
        res.status(401).json({
            autenticado: false
        })
    } else {
        try{
            const series = await obterListaSeries(userId);
            //console.log(series)
            res.status(200).json({series})
        } catch(error){
            res.status(400).json(error)
        }
    }



})
export default router;
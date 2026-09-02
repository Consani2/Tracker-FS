import express from "express";
import {adicionarSerie, obterUtilizador} from "../services/userService.js";
import {obterUtilizadorLogado} from "../../frontend/src/services/userService.js";
import {findSerieById} from "../repositorio/serieRepository.js";


const router = express.Router()

router.post("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId
    const {serie_id} = req.params;
    //console.log("BODY: ", req.body)
    console.log("User id: ", userId);
    const {dados_serie} = req.body
    //console.log("Tipo dados_serie: ", typeof dados_serie);
    await adicionarSerie(userId, serie_id, dados_serie);
    res.status(200).json({
        success: true,
        mensagem: `Série ${dados_serie.nome_serie} adicionada com sucesso!`
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
    console.log("User: ", user)
})

export default router;
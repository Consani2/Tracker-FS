import express from "express";
import {
    adicionarEpAssistido,
    adicionarSerie, obterEpsAssistidos,
    obterListaSeries,
    obterUtilizador, removerEpAssistido,
    removerSerie
} from "../services/userService.js";


const router = express.Router()

router.post("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId
    const {serie_id} = req.params;
    //console.log(userId);
    //console.log("BODY: ", req.body)
    //console.log("User id: ", userId);
    const dados_serie = req.body
    //console.log("Eps. por Temp:  ", dados_serie.eps_por_temporada)
    //console.log("Tipo dados_serie: ", typeof dados_serie);
    await adicionarSerie(userId, serie_id, dados_serie);
    res.status(200).json({
        success: true,
        mensagem: `Série ${dados_serie.serie.name} adicionada com sucesso!`
    })
})

router.delete("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId;
    const {serie_id} = req.params;
    //console.log("Serie id: ", serie_id);
    await removerSerie(userId, serie_id);
    res.status(200).json({
        success: true
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

    if (!userId) {
        return res.status(401).json({
            autenticado: false
        });
    }

    try {
        const series = await obterListaSeries(userId);
        return res.status(200).json({ series });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.patch("/user/series", async (req, res) => {
    const userId = req.session.userId;
    const {serieId, temporada, ep} = req.body
    //console.log("ROUTE user/series | EP Assistido", req.body);
    try{
        await adicionarEpAssistido(userId, serieId, temporada, ep)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error ao adicionar o episódio"
        })
    }
    res.status(200).json({
        success: true
    })

})

router.get("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId;
    const {serie_id} = req.params;
    try {
        const dados = await obterEpsAssistidos(userId, serie_id);
        res.status(200).json({
            success: true,
            body: dados
        })
    } catch (error){
        console.log("ERROR: ", error.message)
    }
})

router.delete("/user/series/:serie_id/:temp_nmr/:ep_nmr", async (req, res) => {
    const userId = req.session.userId;
    const {serie_id, temp_nmr, ep_nmr} = req.params;

    try {
        await removerEpAssistido(userId, serie_id, temp_nmr, ep_nmr);

        res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erro ao remover episódio"
        });
    }

})

export default router;
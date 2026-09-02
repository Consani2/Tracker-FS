import express from "express";
import {adicionarSerie} from "../services/userService.js";


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
        message: `Série ${dados_serie.nome_serie} adicionada com sucesso!`
    })
})

export default router;
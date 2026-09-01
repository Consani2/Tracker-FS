import express from "express";
import {adicionarSerie} from "../services/userService.js";


const router = express.Router()

router.post("/user/series/:serie_id", async (req, res) => {
    const userId = req.session.userId
    const {serie_id} = req.params;
    console.log("BODY: ", req.body)
    const {dados_serie} = req.body
    console.log("Tipo dados_serie: ", typeof dados_serie);
    //adicionarSerie(userId, serie_id, dados_serie);
})

export default router;
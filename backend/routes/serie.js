import express from "express";
import {carregarDetalhesSeason} from "../services/tmdbApiService.js";

const router = express.Router();

router.get("/serie/:id/temporada/:nmrTemporada", async (req, res) => {
    try{
        const {id, nmrTemporada} = req.params;

        const temporada = await carregarDetalhesSeason(id, nmrTemporada);

        res.status(200).json(temporada);

    } catch (error){
        console.log(error);
        res.status(500).json({
            mensagem: "Erro ao carregarDetalhes servidor!", error});
    }
})

export default router;
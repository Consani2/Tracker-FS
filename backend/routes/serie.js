import express from "express";
import {carregarDetalhesSeason, searchByName} from "../services/tmdbApiService.js";
import {searchSeriesByName} from "../../frontend/src/services/apiService.js";

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

router.get("/serie/:nomeSerie", async (req, res) => {
    const {nomeSerie} = req.params;
    const resultados = await searchByName(nomeSerie);
    res.json(resultados);

})

export default router;
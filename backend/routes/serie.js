import express from "express";
import {carregarDetalhesSeason, searchById, searchByName} from "../services/tmdbApiService.js";
import {searchSeriesByName} from "../../frontend/src/services/apiService.js";

const router = express.Router();

router.get("/serie/:id/temporada/:nmrTemporada", async (req, res) => {
    try{
        const {id, nmrTemporada} = req.params;

        const temporada = await carregarDetalhesSeason(id, nmrTemporada);
        //console.log("Dados Temporada: ", temporada);

        res.status(200).json(temporada);

    } catch (error){
        console.log(error);
        res.status(500).json({
            mensagem: "Erro ao carregarDetalhes servidor!", error});
    }
})

router.get("/serie/nome/:nomeSerie", async (req, res) => {
    const {nomeSerie} = req.params;
    const resultados = await searchByName(nomeSerie);
    res.json(resultados);

})
router.get("/serie/:id", async (req, res) => {
    const {id} = req.params;
    //console.log("Router /serie/:id foi chamado. id:  ", id);
    const resultado = await searchById(id);
    //console.log("Resultado router.get serie/id: ", resultado);
    res.json(resultado);
})

export default router;
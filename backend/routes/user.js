import express from "express";
import {adicionarSerie} from "../services/userService.js";


const router = express.Router()

router.post("/user/series/:serie_id", async (req, res) => {
    const {serie_id} = req.params;
    adicionarSerie(serie_id);
})

export default router;
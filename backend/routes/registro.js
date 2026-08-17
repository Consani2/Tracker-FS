import express from "express";
import {registrarUtilizador} from "../services/registroService.js";

const router = express.Router();

router.post("/registro", (req, res) => {
    console.log("Request Body: ", req.body);
    registrarUtilizador(req.body.nome, req.body.senha)
        .then((user) => {
            res.json({
                mensagem: "Registro recebido",
                user: user
            });
        })
        .catch((error) => {
            console.error("Erro ao registrar utilizador:", error);
            res.status(500).json({
                mensagem: "Erro ao registrar utilizador"
            });
        });
});

export default router;
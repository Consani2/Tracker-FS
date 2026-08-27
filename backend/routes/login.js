import express, {response} from "express";
import {logar} from "../services/authService.js";

const router = express.Router();
router.post("/login", async (req, res) => {
    try {
        const user = await logar(
            req.query.nomeLogin,
            req.query.senhaLogin
        );
        req.session.userId = user.id
        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            user
        })

    } catch (erro) {
        res.status(500).json( {
            mensagem: erro.message

        })
        console.log("ERROR: ", erro)
    }


})

export default router
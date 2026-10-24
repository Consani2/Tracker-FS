import express from "express";
import {logar} from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const nomeLogin = req.body?.nomeLogin ?? req.query?.nomeLogin;
        const senhaLogin = req.body?.senhaLogin ?? req.query?.senhaLogin;

        const user = await logar(nomeLogin, senhaLogin);

        if (!user) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        req.session.userId = user.id;
        req.session.save((erro) => {
            if (erro) {
                console.error("Erro ao salvar sessão:", erro);
            }
        });

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            user
        });
    } catch (erro) {
        console.log("ERROR: ", erro);
        return res.status(500).json({ mensagem: erro.message });
    }
});

export default router
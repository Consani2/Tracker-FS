import express, {response} from "express";
import {logar} from "../services/authService.js";

const router = express.Router();
router.get("/login", (req, res) => {
    const username = req.query.nomeLogin
    const password = req.query.senhaLogin;

    /*TODO:
       1. Criar variável user
       2. Atribuir ao valor de retorno da função logar()
       3. Colocar toda a lógica dentro do try()*/

    logar(username, password)
        .then((obj) => (
            res.json({
                mensagem: "Login realizado com sucesso!",
                user: obj
            })
        ))
        .catch((err)=> {
            res.status(500).json({
                mensagem: "Erro ao realizar login.",
                erro: err.message
            })
        });

})

export default router
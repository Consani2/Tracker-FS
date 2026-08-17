import {useEffect, useState} from "react";
import {registrarUtilizador} from "../services/authService.js";

function Registro(){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [listaSeries, setListaSeries] = useState([]);

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input onChange={(e) => setNome(e.target.value)} type="text" id={"nome"} placeholder="Username" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id={"senha"} placeholder="Password" />
                <button onClick={() => fetch("http://localhost:3000/api/registro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({nome: nome, senha: senha})
                })} type="submit">Registrar</button>
            </form>
        </div>

    )
}
export default Registro;
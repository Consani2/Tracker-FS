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
                <button onClick={() => registrarUtilizador({nome, senha, listaSeries})} type="submit">Registrar</button>
            </form>
        </div>

    )
}
export default Registro;
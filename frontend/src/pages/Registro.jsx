import {useEffect, useState} from "react";

function Registro(){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    let dados = {}

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input onChange={(e) => setNome(e.target.value)} type="text" id={"nome"} placeholder="Username" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id={"senha"} placeholder="Password" />
                <button onClick={ () => {
                    dados = {nome, senha}
                    if(localStorage.getItem("users")=== null){

                    localStorage.setItem("users", JSON.stringify([dados]));
                        }
                    else {
                        //transforma users em objeto JS, adiciona dados e, por último, transforma-os em ‘String’ para armazenar no localStorage
                        localStorage.setItem("users", JSON.stringify([...JSON.parse(localStorage.getItem("users")), dados]));
                    }
                }
                } type="submit">Registrar</button>
            </form>
        </div>

    )
}
export default Registro;
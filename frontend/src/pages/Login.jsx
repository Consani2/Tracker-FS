import {useState} from "react";
import {logar} from "../services/authService.js";

function Login (){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    return(
        <div>
            <h1 >Login </h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e)=>setNome(e.target.value)} type="text" placeholder="Username" />
                <input onChange={(e)=>setSenha(e.target.value)} type="password" placeholder="Password" />
                <button onClick={()=> {
                    logar(nome, senha);
                    }
                } type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
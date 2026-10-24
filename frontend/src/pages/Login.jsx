import { useState } from "react";
import { logar } from "../services/authService.js";

function Login() {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const data = await logar(nome, senha);
            console.log("Login ok:", data);
            window.location.href = "/lista_series";
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    placeholder="Username"
                />
                <input
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
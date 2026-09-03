import { createContext, useEffect, useState } from "react";
import { obterUtilizadorLogado } from "../services/userService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function carregarUtilizador() {
            const utilizador = await obterUtilizadorLogado();
            setUser(utilizador);
        }

        carregarUtilizador();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
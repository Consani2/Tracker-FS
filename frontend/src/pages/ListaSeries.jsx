import {useEffect, useState} from "react";
import ExibirEpsTemporada from "../components/ExibirEpsTemporada.jsx";
import {obterUtilizadorLogado} from "../services/userService.js";

// Página que exibe a lista de séries do utilizador, permitindo selecionar temporadas e visualizar detalhes de cada série.
function ListaSeries() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function carregarUtilizador(){
            const utilizador = await obterUtilizadorLogado();
            console.log(utilizador);
            setUser(utilizador);
        }
        carregarUtilizador();
    }, [])

    return (
        <>
            <h1>Sua Lista de Séries</h1>

            <>
                Em construção. Utilizador: {user}
            </>
        </>
    );
}

export default ListaSeries;
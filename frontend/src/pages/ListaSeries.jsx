import {useContext, useEffect, useState} from "react";
import ExibirEpsTemporada from "../components/ExibirEpsTemporada.jsx";
import {listarSerieUser, obterUtilizadorLogado} from "../services/userService.js";
import {AuthContext} from "../contexts/AuthContext.jsx";

// Página que exibe a lista de séries do utilizador, permitindo selecionar temporadas e visualizar detalhes de cada série.
//:TODO: Continuar Implementação
function ListaSeries() {
    const {user} = useContext(AuthContext);
    const [dados_series, setDadosSeries] = useState(null)
    useEffect(() => {
        async function carregarDadosLista(){
            const resp = await listarSerieUser();

            console.log("Response: ", resp);
            setDadosSeries(resp)
        }

        carregarDadosLista();
    }, [])
    if(!dados_series){
        return <p>Carregando...</p>
    }

    return (
        <>
            <h1>Sua Lista de Séries</h1>

            <>
                Em construção. ID Utilizador: {user?.id} | Nome Utilizador: {user?.username}
            </>
            <>{dados_series?.series.map((serie)=>(
                <div key={serie?.series_id}>
                    <ExibirEpsTemporada serie = {serie.dados_serie}/>
                </div>
                ))}
            </>

        </>
    );
}
export default ListaSeries;
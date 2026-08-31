import {useParams} from "react-router-dom";
import {searchSeriesById} from "../services/apiService.js";
import {useEffect, useState} from "react";
import ExibirEpsTemporada from "../components/ExibirEpsTemporada.jsx";

//Página de detalhes da série, exibe informações detalhadas sobre a série selecionada pelo utilizador, incluindo temporadas e episódios.
function DetalhesSeries() {
    const {id} = useParams();
    const[serie, setSerie] = useState(null);

    useEffect(() => {
        async function carregarSerie() {
            try{
                const response = await searchSeriesById(id);
                const dados = await response.json();
                //console.log("Resultado searchSerieById em Detalhes Series: ", dados)
                setSerie(dados);
            } catch (error) {
                console.error("Erro ao carregar a série:", error);
            }
        }
        carregarSerie();
    }, [id]);

    if (serie === null) {
        return  (
            <p>Carregando...</p>
        )
    }

        return (
        <div>
            <p>{serie.name}</p>
            <ExibirEpsTemporada serie = {serie}/>
        </div>
    );


}



export default DetalhesSeries;
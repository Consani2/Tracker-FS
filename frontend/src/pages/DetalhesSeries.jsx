import {useParams} from "react-router-dom";
import {searchSeriesById} from "../services/tmbdbService.js";
import {useEffect, useState} from "react";
import ExibirDetalhesSeason from "../components/ExibirDetalhesSeason.jsx";



function DetalhesSeries() {
    const {id} = useParams();
    const[serie, setSerie] = useState(null);
    let count = 0;

    useEffect(() => {
        async function carregarSerie() {
            try{
                const dados = await searchSeriesById(id);
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
            <ExibirDetalhesSeason serie = {serie}/>
        </div>
    );


}



export default DetalhesSeries;
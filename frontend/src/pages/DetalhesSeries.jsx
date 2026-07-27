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
            const dados = await searchSeriesById(id);
            setSerie(dados);
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
            <div>
                {Array.from({ length: serie.number_of_seasons }, (temporada, i) => (
                    <div key={i}>
                        <p >Temporada {i + 1}</p>
                        <ExibirDetalhesSeason
                            id = {id}
                            temporada = {i +1}
                        />
                    </div>

                ))}
            </div>
        </div>
    );


}



export default DetalhesSeries;
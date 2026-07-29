import {carregarDetalhesSeason} from "../services/tmbdbService.js";
import {useEffect, useState} from "react";

function ExibirDetalhesSeason(props){
    const [dados, setDados] = useState(null)

    useEffect(()=> {
        async function carregarDados(){
            const resultado = (await carregarDetalhesSeason(props.serie.id, props.serie.number_of_seasons));
            setDados(resultado);
        }
        carregarDados();
        console.log(dados)
    }, [props.serie.number_of_seasons])
    console.log(dados)

    return (
        <div>
            <div>
                <section>Episódios: {props.serie.number_of_episodes} | Temporadas: {props.serie.number_of_seasons}</section>
            </div>
            <div>
                {Array.from({ length: props.serie.number_of_seasons }, (temporada, i) => (
                    <div key={i}>
                        <h3>Temporada {i + 1} {props.serie.seasons[i].name} </h3>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ExibirDetalhesSeason;
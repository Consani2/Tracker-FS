import { carregarDetalhesSeason } from "../services/tmbdbService.js";
import { useEffect, useState } from "react";

function ExibirDetalhesSeason(props) {

    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);

    useEffect(() => {

        async function carregarDados() {
            const resultado = await carregarDetalhesSeason(
                props.serie.id,
                temporadaSelecionada
            );

            setDadosTemporada(resultado);
        }

        carregarDados();

    }, [props.serie.id, temporadaSelecionada]);
    //console.log("DADOS TEMPORADA: ", dadosTemporada)

    return (
        <div>

            <section>
                Episódios: {props.serie.number_of_episodes}
                <br/>
                Temporadas: {props.serie.number_of_seasons}
                <br/>
                <button onClick={()=>{
                    //Adiciona a série à lista do utilizador no localStorage
                    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                    if (currentUser.listaSeries.includes({id: props.serie.id})) {
                        alert("Série já está na sua lista.")
                    } else {
                        currentUser.listaSeries.push({name: props.serie.name, id: props.serie.id, temporadas: props.serie.number_of_seasons, episodios: props.serie.number_of_episodes});
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));}
                }}> Adicionar Série à sua Lista</button>
            </section>

            <br/>

            <label>Selecione a temporada: </label>
            {/*Cria lista de temporadas e atualiza os detalhes conforme a seleção do utilizador*/}
            <select
                value={temporadaSelecionada}
                onChange={(e) =>
                    setTemporadaSelecionada(Number(e.target.value))
                }
            >
                {Array.from(
                    { length: props.serie.number_of_seasons },
                    (_, i) => (
                        <option key={i} value={i + 1}>
                            Temporada {i + 1}
                        </option>
                    )
                )}
            </select>

            <hr/>
            <h4>
                Número de episódios: {dadosTemporada?.[temporadaSelecionada - 1]?.episodes?.length}
            </h4>

            <div>
                {/*Mapeia os episódios de cada temporada selecionada pelo utilizador*/}
                {dadosTemporada?.[temporadaSelecionada - 1]?.episodes?.map((episodio, i) => (
                    <div key={episodio.id}>
                        <input
                            id={`ep-${episodio.id}`}
                            type="checkbox"
                        />

                        <span>
                            Episódio {i + 1}: {episodio.name}
                        </span>

                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExibirDetalhesSeason;
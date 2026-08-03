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
    console.log("DADOS TEMPORADA: ", dadosTemporada)

    return (
        <div>

            <section>
                Episódios: {props.serie.number_of_episodes}
                <br/>
                Temporadas: {props.serie.number_of_seasons}
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

            <p>{dadosTemporada?.overview}</p>
            <div>
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
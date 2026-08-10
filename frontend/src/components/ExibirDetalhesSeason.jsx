import { carregarDetalhesSeason } from "../services/tmbdbService.js";
import { useEffect, useState } from "react";

//recebe como props a série selecionada pelo utilizador e exibe os detalhes da temporada selecionada, incluindo os episódios.
// Permite adicionar a série à lista do utilizador no localStorage.
function ExibirDetalhesSeason(props) {

    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [serieJaExiste, setSerieJaExiste] = useState(currentUser?.listaSeries?.some(
        (item) => item.id === props.serie.id
    ));

    useEffect(() => {

        //Carrega dados a partir do endpoint utilizando o ID
        async function carregarDados() {
            const resultado = await carregarDetalhesSeason(
                props.serie.id,
                temporadaSelecionada
            );

            setDadosTemporada(resultado);
        }

        carregarDados();

    }, [props.serie.id, temporadaSelecionada, serieJaExiste]);
    //console.log("DADOS TEMPORADA: ", dadosTemporada)

    return (
        <div>

            <section>
                Episódios: {props.serie.number_of_episodes}
                <br/>
                Temporadas: {props.serie.number_of_seasons}
                <br/>
                    {!serieJaExiste && (
                        <button onClick={() => {
                            // Adiciona a série à lista do utilizador no localStorage
                            setSerieJaExiste(true);
                            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                            currentUser.listaSeries.push({id: props.serie.id, serie: props.serie, temporadas: dadosTemporada});
                            localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        }}>
                            Adicionar Série à sua Lista
                        </button>
                    )}
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
                Número de episódios: {dadosTemporada?.episodes?.length}
            </h4>

            <div>
                {/*Mapeia os episódios de cada temporada selecionada pelo utilizador*/}
                {dadosTemporada?.episodes?.map((episodio, i) => (
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
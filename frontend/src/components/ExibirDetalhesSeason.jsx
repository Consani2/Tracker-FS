import { carregarDetalhesSeason } from "../services/tmbdbService.js";
import { useEffect, useState } from "react";

//Recebe como props a série selecionada pelo utilizador e exibe os detalhes da temporada selecionada, incluindo os episódios.
// Permite adicionar a série à lista do utilizador no localStorage.
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}


function ExibirDetalhesSeason(props) {

    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const currentUser = getCurrentUser();

    console.log("currentUser Lista series", currentUser.listaSeries)
    console.log("É array ? ", Array.isArray(currentUser.listaSeries))
    const [serieJaExiste, setSerieJaExiste] = useState(currentUser?.listaSeries?.some(
        (item) => item.id === props.serie.id
    ));
    const [todosEpAtivo, setTodosEpAtivo] = useState(false);

    const serieAtual = currentUser.listaSeries.find(
        item => item.id === props.serie.id);

    const [episodiosAssistidos, setEpisodiosAssistidos] = useState(
        serieAtual?.episodios_assistidos || []
    );

    //console.log(episodiosAssistidos);
    //console.log(dadosTemporada)

    console.log("episodiosAssistidos", episodiosAssistidos);

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

    }, [props.serie.id, temporadaSelecionada]);

    function adicionarSerieListaUser(currentUser){
        currentUser.listaSeries.push({
            id: props.serie.id,
            nome_serie: props.serie.name,
            serie: props.serie,
            episodios_assistidos: []
        });

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        props.setUser(currentUser);
        return currentUser;
    }

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
                        const currentUser = getCurrentUser();
                        adicionarSerieListaUser(currentUser);
                    }}>
                        Adicionar Série à sua Lista
                    </button>
                )}

                {serieJaExiste && (
                    <button onClick={() => {
                        // Remove a série da lista do utilizador no localStorage
                        setSerieJaExiste(false);
                        const currentUser = getCurrentUser();

                        currentUser.listaSeries = currentUser.listaSeries.filter(
                            (item) => item.id !== props.serie.id
                        );

                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        props.setUser(currentUser);
                    }}>
                        Remover Série da Lista
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
            <br/>
            { !todosEpAtivo && (
                <button onClick={() =>  {
                if(!serieAtual){
                alert("Adicione a série à sua lista antes de marcar episódios como assistidos.");
                return;
            }

                const novaLista = Array.from({ length: dadosTemporada?.episodes.length },
                    (_, i) => ({
                        temporada: temporadaSelecionada,
                        nmr_episodio: dadosTemporada?.episodes[i]?.episode_number
                        })
                    );
                setEpisodiosAssistidos(novaLista);
                setTodosEpAtivo(true);

                currentUser.listaSeries = currentUser.listaSeries.map(
                    (serie) =>
                        serie.id === serieAtual.id
                            ? {...serie, episodios_assistidos: novaLista}
                            : serie
                )

                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                //console.log(serieAtual);

            }}>Marcar Temporada como Assistida</button>
            )}
            {todosEpAtivo && (
                <button onClick={()=>{
                    setTodosEpAtivo(false);
                    setEpisodiosAssistidos([]);
                    serieAtual.episodios_assistidos = [];
                    console.log(serieAtual);
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                }
                }>Desmarcar Temporada</button>
            )}

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
                            checked={episodiosAssistidos.some((ep) =>
                                ep.temporada === temporadaSelecionada &&
                                ep.nmr_episodio === episodio.episode_number
                            )}
                            onChange={(e) => {
                                if (!serieAtual) {
                                    alert("Adicione a série à sua lista antes de marcar episódios como assistidos.");
                                    return;
                                }

                                let novaLista;

                                if (e.target.checked) {

                                    novaLista = [
                                        ...episodiosAssistidos,
                                        {
                                            temporada: temporadaSelecionada,
                                            nmr_episodio: episodio.episode_number
                                        }
                                    ];

                                } else {
                                    novaLista = episodiosAssistidos.filter((ep) =>
                                        !(
                                            ep.temporada === temporadaSelecionada &&
                                            ep.nmr_episodio === episodio.episode_number
                                        )
                                    );
                                }

                                setEpisodiosAssistidos(novaLista);
                                serieAtual.episodios_assistidos = novaLista;
                                //console.log("serie atual: ",serieAtual);
                                //console.log("nova lista", novaLista)

                                currentUser.listaSeries = currentUser.listaSeries.map(
                                    serie => serie.id === serieAtual.id
                                        ? serieAtual
                                        : serie
                                );
                                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                            }}
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
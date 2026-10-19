import { carregarDetalhesSeason } from "../services/apiService.js";
import {useContext, useEffect, useState} from "react";
import {
    adicionarSerie, carregarDadosUser,
    listarSerieUser,
    marcarEpAssistidoAPI,
    obterEpsAssistidosAPI,
    removerSerie
} from "../services/userService.js";
import {AuthContext} from "../contexts/AuthContext.jsx";
import listaSeries from "../pages/ListaSeries.jsx";

//TODO: Atualizar checkbox para episodios assistidos.
function serieEstaNaLista(lista, idSerie){
    return lista.some(serie => serie.series_id === idSerie);
}

function ExibirEpsTemporada(props) {
    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const listaUser = props.listaUser ?? [];

    const [todosEpAtivo, setTodosEpAtivo] = useState(false);
    const [epsAssistidos, setEpAssistido] = useState([]);
    const serie = props.serie
    console.log("Série: ", serie)
    console.log("Props ", props)
    const serieJaExiste = serieEstaNaLista(listaUser, serie.id);
    console.log("EPs assistidos: ", epsAssistidos)

    useEffect(() => {

        //Carrega dados da season e a armazena-os em dadosTemporada
        async function carregarDados() {
            const response = await carregarDetalhesSeason(
                serie.id,
                temporadaSelecionada
            );
            const dados = await response.json();

            setDadosTemporada(dados);
            //console.log("Dados temporada: ", dados)
        }

        carregarDados();

    }, [serie.id, temporadaSelecionada]);

    useEffect(() => {
        async function carregarEpAssistidos(){
            const dados = await obterEpsAssistidosAPI(serie.id)
            //console.log(dados)

            setEpAssistido(dados)

            //const temporada = dados.find(item => item.temporada === temporadaSelecionada);


        } carregarEpAssistidos()
    }, [serie.id]);

    async function adicionarSerieListaUser() {
        const dados_serie = {
            serie: serie,
            eps_por_temporada: serie.seasons.map((temporada) => ({
                temporada: temporada.season_number,
                total_episodios: temporada.episode_count,

            })),
            episodios_assistidos: []
        };
        //console.log("Dados_serie: ", dados_serie);
        await adicionarSerie(dados_serie);
        const dados = await listarSerieUser();
        setListaUser(dados.series);
    }
    async function removerSerie() {
        await props.removerDaLista(props.serieId)
    }
    async function marcarEpAssistido(temporada, ep, marcado){
        await marcarEpAssistidoAPI(serie.id, temporada, ep, marcado);

        setEpAssistido((atuais) => {
            if(marcado){
                const jaExiste = atuais.some(
                    item =>
                        item.season_number === temporada &&
                        item.episode_number === ep
                )
                if(jaExiste) return atuais;

                return [
                    ...atuais,
                    {
                        season_number: temporada,
                        episode_number: ep,
                    }
                ];
            }

            return atuais.filter(
                item =>
                    !(
                        item.season_number === temporada &&
                        item.episode_number === ep
                    )
            )
        })

    }


    return (
        <div>

            <section>
                Nome: {serie.name}
                <br/>
                Episódios: {serie.number_of_episodes}
                <br/>
                Temporadas: {serie.number_of_seasons}
                <br/>

                {serieJaExiste ? (
                    <button onClick={()=> removerSerie()}>
                        Remover Série da Lista
                    </button>
                ):
                    <button onClick={adicionarSerieListaUser}>
                        Adicionar à Lista
                    </button>
                }
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
                    { length: serie.number_of_seasons },
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

            }}>Marcar Temporada como Assistida</button>
            )}
            {todosEpAtivo && (
                <button onClick={()=>{
                    setTodosEpAtivo(false);
                    setEpisodiosAssistidos([]);
                    serieAtual.episodios_assistidos = [];
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
                            type={"checkbox"}
                            checked={epsAssistidos.some(
                                item =>
                                    item.season_number === temporadaSelecionada &&
                                    item.episode_number === episodio.number
                            )}
                            onChange={(event) => {
                                //console.log("EP assistidos: ",epsAssistidos)
                                const marcado = event.target.checked

                                marcarEpAssistido(
                                    temporadaSelecionada,
                                    episodio.episode_number,
                                    marcado
                                )
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


export default ExibirEpsTemporada;
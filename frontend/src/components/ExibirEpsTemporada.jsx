import { carregarDetalhesSeason } from "../services/apiService.js";
import {useContext, useEffect, useState} from "react";
import {adicionarSerie, listarSerieUser, removerSerie} from "../services/userService.js";
import {AuthContext} from "../contexts/AuthContext.jsx";
import listaSeries from "../pages/ListaSeries.jsx";

function serieEstaNaLista(lista, idSerie){
    return lista.some(serie => serie.series_id === idSerie);
}

function ExibirEpsTemporada(props) {
    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const [todosEpAtivo, setTodosEpAtivo] = useState(false);
    const [listaUser, setListaUser] = useState([]);
    const serie = props.serie
    //console.log("Lista user: ", listaUser)
    const serieJaExiste = serieEstaNaLista(listaUser, serie.id);
    //console.log(serie)

    //Busca lista de séries do na "Minha Lista" do utilizador. Armazena o valor na array ListaUser
    useEffect(()=>{
        async function fetchData(){
            const dados = await listarSerieUser()
            //console.log("DADOS", dados.series)
            setListaUser(dados.series);
        }
        fetchData();
    }, [])

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
    async function removerSerieListaUser(idSerie) {
        //TODO: Implementar remover série Lista user
        //Cada componente série tem seu ID associado.
        //Enviar apenas o ID da série a ser removida para o backend
        //Dúvida: Como atualizar o estado da lista do utilizaodor?
        //console.log("ID Série: ", idSerie)
        await removerSerie(idSerie);
        const dados = await listarSerieUser();
        setListaUser(dados.series);
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
                    <button onClick={()=> removerSerieListaUser(serie.id)}>
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
                        <input type={"checkbox"}
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
import { useEffect, useState } from "react";
import { carregarDetalhesSeason } from "../services/apiService.js";
import {
    adicionarSerie,
    listarSerieUser,
    marcarEpAssistidoAPI,
    obterEpsAssistidosAPI,
} from "../services/userService.js";

function serieEstaNaLista(lista, idSerie) {
    if (!Array.isArray(lista) || !idSerie) return false;

    return lista.some(
        (serie) => Number(serie.series_id ?? serie.id) === Number(idSerie)
    );
}

function ExibirEpsTemporada(props) {
    const serie = props.serie ?? {};
    const serieId = props.serieId ?? serie.id ?? null;
    const listaUser = Array.isArray(props.listaUser) ? props.listaUser : [];

    const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const [epsAssistidos, setEpAssistido] = useState([]);
    const [serieNaLista, setSerieNaLista] = useState(false);
    //console.log("Eps assistidos: ", epsAssistidos)

    useEffect(() => {
        setSerieNaLista(serieEstaNaLista(listaUser, serieId));
    }, [listaUser, serieId]);

    useEffect(() => {
        if (!serieId) return;

        let ativo = true;

        async function carregarDados() {
            const response = await carregarDetalhesSeason(serieId, temporadaSelecionada);
            const dados = await response.json();

            if (ativo) {
                setDadosTemporada(dados);
            }
        }

        carregarDados();

        return () => {
            ativo = false;
        };
    }, [serieId, temporadaSelecionada]);

    useEffect(() => {
        if (!serieId) return;

        let ativo = true;

        async function carregarEpAssistidos() {
            const dados = await obterEpsAssistidosAPI(serieId);

            if (ativo) {
                setEpAssistido(Array.isArray(dados) ? dados : []);
            }
        }

        carregarEpAssistidos();

        return () => {
            ativo = false;
        };
    }, [serieId]);

    async function adicionarSerieListaUser() {
        if (!serie?.id) return;

        const dados_serie = {
            serie,
            eps_por_temporada: (serie.seasons ?? []).map((temporada) => ({
                temporada: temporada.season_number,
                total_episodios: temporada.episode_count,
            })),
            episodios_assistidos: [],
        };

        await adicionarSerie(dados_serie);
        const dados = await listarSerieUser();
        const series = dados?.series ?? [];

        setSerieNaLista(true);

        if (typeof props.onListaAtualizada === "function") {
            props.onListaAtualizada(series);
        }
    }

    async function removerSerieDaLista() {
        if (!serieId || typeof props.removerDaLista !== "function") {
            return;
        }

        await props.removerDaLista(serieId);
        setSerieNaLista(false);
    }

    async function marcarEpAssistido(temporada, ep, marcado) {
        if (!serieId) return;

        try{
        await marcarEpAssistidoAPI(serieId, temporada, ep, marcado);

        setEpAssistido((atuais) => {
            if (marcado) {
                const jaExiste = atuais.some(
                    (item) =>
                        Number(item.season_number) === temporada &&
                        Number(item.episode_number) === ep
                );

                if (jaExiste) return atuais;

                return [
                    ...atuais,
                    {
                        season_number: temporada,
                        episode_number: ep,
                    },
                ];
            }

            return atuais.filter(
                (item) =>
                    !(item.season_number === temporada && item.episode_number === ep)
            );
        });
    } catch(err){
        console.log("Erro ao marcar o episodio", err)
        }
    }

    if (!serie?.name) {
        return null;
    }

    return (
        <div>
            <section>
                Nome: {serie.name}
                <br />
                Episódios: {serie.number_of_episodes}
                <br />
                Temporadas: {serie.number_of_seasons}
                <br />

                {serieNaLista ? (
                    <button onClick={removerSerieDaLista}>
                        Remover Série da Lista
                    </button>
                ) : (
                    <button onClick={adicionarSerieListaUser}>
                        Adicionar à Lista
                    </button>
                )}
            </section>

            <br />

            <label>Selecione a temporada: </label>
            <select
                value={temporadaSelecionada}
                onChange={(event) => setTemporadaSelecionada(Number(event.target.value))}
            >
                {Array.from({ length: serie.number_of_seasons ?? 0 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        Temporada {i + 1}
                    </option>
                ))}
            </select>

            <h4>Número de episódios: {dadosTemporada?.episodes?.length ?? 0}</h4>

            <div>
                {dadosTemporada?.episodes?.map((episodio, i) => (
                    <div key={episodio.id ?? `${temporadaSelecionada}-${episodio.episode_number}`}>
                        <input
                            type="checkbox"
                            checked={epsAssistidos.some(
                                (item) =>
                                    item.season_number === temporadaSelecionada &&
                                    item.episode_number === episodio.episode_number
                            )}
                            onChange={(event) => {
                                marcarEpAssistido(
                                    temporadaSelecionada,
                                    episodio.episode_number,
                                    event.target.checked
                                );
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
import {useContext, useEffect, useState} from "react";
import ExibirEpsTemporada from "../components/ExibirEpsTemporada.jsx";
import {listarSerieUser, obterUtilizadorLogado, removerSerie} from "../services/userService.js";
import {AuthContext} from "../contexts/AuthContext.jsx";

function ListaSeries() {
    //const {user} = useContext(AuthContext);
    const [listaUser, setListaUser] = useState(null)
    useEffect(() => {
        async function carregarDadosLista() {
            const resp = await listarSerieUser();
            setListaUser(resp ?? { series: [] });
        }

        carregarDadosLista();
    }, []);

    async function removerDaLista(idSerie) {
        await removerSerie(idSerie);
        const novaLista = await listarSerieUser();
        setListaUser(novaLista ?? { series: [] });
    }

    if (!listaUser) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <h1>Sua Lista de Séries</h1>
            {listaUser.series?.length ? (
                listaUser.series.map((serie) => {
                    const dadosSerie = serie?.dados_serie?.dados_serie ?? serie?.dados_serie ?? null;

                    return (
                        <div key={serie?.series_id ?? serie?.id}>
                            <ExibirEpsTemporada
                                serie={dadosSerie?.serie ?? dadosSerie}
                                serieId={serie.series_id ?? serie.id}
                                listaUser={listaUser.series}
                                removerDaLista={removerDaLista}
                            />
                        </div>
                    );
                })
            ) : (
                <p>Você ainda não adicionou séries à lista.</p>
            )}
        </>
    );
}
export default ListaSeries;
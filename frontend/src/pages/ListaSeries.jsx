import {useContext, useEffect, useState} from "react";
import ExibirEpsTemporada from "../components/ExibirEpsTemporada.jsx";
import {listarSerieUser, obterUtilizadorLogado, removerSerie} from "../services/userService.js";
import {AuthContext} from "../contexts/AuthContext.jsx";

function ListaSeries() {
    //const {user} = useContext(AuthContext);
    const [listaUser, setListaUser] = useState(null)
    useEffect(() => {
        async function carregarDadosLista(){
            const resp = await listarSerieUser();
            console.log("response listauser: ", resp)

            //console.log("Lista recebida: ", resp);
            setListaUser(resp)
        }

        carregarDadosLista();
    }, []);

    async function removerDaLista(idSerie){
        await removerSerie(idSerie);
        const novaLista = await listarSerieUser();
        setListaUser(novaLista);
    }
    if(!listaUser){
        return <p>Carregando...</p>
    }

    return (
        <>
            <h1>Sua Lista de Séries</h1>
            <>
                {listaUser?.series.map((serie) => {
                    //console.log("Série:", serie);
                    //console.log("Dados da série: ", serie.dados_serie)

                    return (
                        <div key={serie?.series_id}>
                            <ExibirEpsTemporada
                                serie={serie.dados_serie}
                                serieId={serie.series_id}
                                listaUser={listaUser.series}
                                removerDaLista={removerDaLista}
                            />
                        </div>
                    );
                })}
            </>

        </>
    );
}
export default ListaSeries;
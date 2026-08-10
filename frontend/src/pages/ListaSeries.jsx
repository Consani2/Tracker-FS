import {useState} from "react";
import ExibirDetalhesSeason from "../components/ExibirDetalhesSeason.jsx";

function ListaSeries(){
    const [temporadaSelecionada, setTemporadaSelecionada] = useState({});
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <>
            <h1>Sua Lista de Séries</h1>
            <>{user.listaSeries?.length > 0 ? user.listaSeries.map((dado) => (
                <div key={dado.serie.id}>
                    <h2>
                        Nome da Série: {dado.serie.name}
                    </h2>
                    <h3>Progresso: </h3>
                    <p> Temporadas: {dado.serie.number_of_seasons} | Episódios: {dado.serie.number_of_episodes}</p>
                    <ExibirDetalhesSeason serie = {dado.serie} />

                    <label>Selecione a temporada: </label>
                    {/*Cria lista de temporadas e atualiza os detalhes conforme a seleção do utilizador*/}
                    <select
                        value={temporadaSelecionada[dado.serie.id] || 1}
                        onChange={(e) =>
                            setTemporadaSelecionada({
                                ...temporadaSelecionada,
                                [dado.serie.id]: Number(e.target.value)
                            })
                        }
                    >
                        {Array.from(
                            { length: dado.serie.number_of_seasons },
                            (_, i) => (
                                <option key={i} value={i + 1}>
                                    Temporada {i + 1}
                                </option>
                            )
                        )}
                    </select>
                    <br/>
                </div>
            )) : "Nenhuma Série adicionada"}</>
            <p></p>

</>    )
}
export default ListaSeries;
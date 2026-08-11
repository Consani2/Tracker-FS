import { useState } from "react";
import ExibirDetalhesSeason from "../components/ExibirDetalhesSeason.jsx";

// Página que exibe a lista de séries do utilizador, permitindo selecionar temporadas e visualizar detalhes de cada série.
function ListaSeries() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    return (
        <>
            <h1>Sua Lista de Séries</h1>

            <>
                {user.listaSeries?.length > 0
                    ? user.listaSeries.map((dado) => (
                          <div key={dado.serie.id}>
                              <hr/>
                              <h2>
                                  Nome da Série: {dado.serie.name}
                              </h2>

                              <ExibirDetalhesSeason
                                  serie={dado.serie}
                                  setUser={setUser}
                              />
                          </div>
                      ))
                    : (
                          <p>Você não possui séries na sua lista.</p>
                      )}
            </>
        </>
    );
}

export default ListaSeries;
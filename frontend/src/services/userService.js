export async function listarSerieUser(){
    const response = await fetch("http://localhost:3000/api/user/series", {
        credentials: "include"
    })
    const dados = await response.json();
    console.log(dados)
    if (dados.autenticado === false){
        alert ("Utilizador não logado!");
        return false;
    }
    return dados;
}

export async function adicionarSerie(dados_serie){
    //console.log(dados_serie)
    //console.log("Dados série: ", serie);
    const url = `http://localhost:3000/api/user/series/${dados_serie.serie.id}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados_serie),
    })
    return await response.json();
}
export async function removerSerie(idSerie){
    const url = `http://localhost:3000/api/user/series/${idSerie}`
    const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
    })
    const dadoResp = await response.json();
    if (dadoResp.success){
        return alert("Série removida com sucesso.")
    } else {
        return alert("Falha ao remover a série")
    }
}
export async function obterUtilizadorLogado(){
    const response = await fetch("http://localhost:3000/api/user/me",{
        credentials: "include"
    });
    if (!response.ok){
        const dados = await response.json();
        console.log("Erro: ",dados.autenticado)
        return null;
    }
    return await response.json();

}
export async function marcarEpAssistidoAPI(serieId, temporada, ep, marcado){
    const url = `http://localhost:3000/api/user/series`
    console.log(`EP ${ep} | Temporada ${temporada} | Marcado ${marcado}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({serieId, temporada, ep, marcado}),
        credentials: "include"
    })
    if (response.ok){
        return await response.json();
    } else {
        return response.headers
    }
}
export async function obterEpsAssistidosAPI(serieId){
    //console.log("ObterEpAssistidosAPI foi chamado!")
    const url = `http://localhost:3000/api/user/series/${serieId}`
    const response = await fetch(url, {
        method: "GET",
        credentials: "include"
    })
    const dados = await response.json()
    //console.log("Dados: ", dados)

    if (!response.ok) {
        throw new Error("Não foi possível obter os episódios assistidos.");
    }

    return response.json();
}
export async function carregarDadosUser(){
    const response = await fetch("http://localhost:3000/api/user/me",{
        method: "GET",
        credentials: "include"
    })
}
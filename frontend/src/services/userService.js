export async function listarSerieUser(){
    const response = await fetch("http://localhost:3000/api/user/series", {
        credentials: "include"
    })
    const dados = await response.json();
    if (dados.autenticado === false){
        alert ("Utilizador não logado!");
        return false;
    }
    return dados;
}

export async function adicionarSerie(dados_serie){
    console.log(dados_serie)
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
    console.log(await response.json())
    return await response.json();
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

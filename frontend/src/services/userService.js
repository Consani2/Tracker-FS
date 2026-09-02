//TODO: Implementar função
export async function listarSerieUser(id){

}

export async function adicionarSerie({dados_serie}){
    console.log(dados_serie);
    const url = `http://localhost:3000/api/user/series/${dados_serie.id}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({dados_serie}),
    })
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

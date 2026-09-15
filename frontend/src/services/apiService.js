export async function searchSeriesByName(query) {

    let url = `http://localhost:3000/api/serie/nome/${query}`;
    const response = await fetch(url);
    return await response.json();
    }

export async function searchSeriesById(id){
    //console.log("ID: ", id)
    let url = `http://localhost:3000/api/serie/${id}`
    return await fetch(url, {
        method: "GET"
    });
}

//Recebe ID e o número de temporadas de uma série
//Retorna um array com os detalhes de cada temporada
export async function carregarDetalhesSeason(id, nmr_temporada){
    let url = `http://localhost:3000/api/serie/${id}/temporada/${nmr_temporada}`;
    return  await fetch(url);
}

/* TODO: 1. Passar o TOKEN para backend
*   2. Testar requisição à API*/
const TOKEN = process.env.TMDB_BEARER_TOKEN
export async function carregarDetalhesSeason(id, nmr_temporada) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${nmr_temporada}`;

    const response = await fetch(url,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    console.log(response);
    return response.json();
}

export async function searchByName(nome){
    const params = new URLSearchParams({
        query: nome
    });
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?${params}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${TOKEN}`
        }
    })
    return await response.json();
}
import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;


async function requisitar(url, query){
    return await axios.get(url, {
        params: {
            query: query
        },
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }

    })
}

export async function searchSeriesByName(query) {

    let url = `https://api.themoviedb.org/3/search/tv`;

    const response = await requisitar(url, query)
    //console.log(response.data);

    return response.data.results;

    }

export async function searchSeriesById(id){
    let url = "https://api.themoviedb.org/3/tv/" + id;
    const response = await requisitar(url);
    return response.data;
}

//Recebe ID e o número de temporadas de uma série
//Retorna um array com os detalhes de cada temporada
export async function carregarDetalhesSeason(id, nmr_temporada){
    let url = `https://api.themoviedb.org/3/tv/${id}/season/${nmr_temporada}`;
    const response = await requisitar(url);
    //console.log(response.data)
    //console.log(response)
    return response.data;
}
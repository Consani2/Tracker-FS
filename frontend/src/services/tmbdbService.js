import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;


async function requistar(url, query){
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

    const response = await requistar(url, query)
    console.log(response)
    console.log(response.data);

    return response.data.results;

    }

export async function searchSeriesById(id){
    let url = "https://api.themoviedb.org/3/tv/" + id;
    const response = await requistar(url);
    return response.data;
}

export async function carregarDetalhesSeason(id, nmrSeasons){
    let url = `https://api.themoviedb.org/3/tv/${id}/season/`;
    const dados = [];
    for (let i = 0; i < nmrSeasons ; i++) {
        const response = await requistar(url + (i +1));
        dados.push(response.data)
    }
    //console.log(dados)
    //console.log(response)
    return dados;
}
import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

export async function searchSeriesByName(query) {

    let url = `https://api.themoviedb.org/3/search/tv`

    const response = await request(url, query)
    console.log(response.data);

    return response.data.results;

    }

export async function searchSeriesById(id){
    let url = "https://api.themoviedb.org/3/tv/" + id;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    await exibirDetalhesSeason(id, 1);

    return response.data;
}

export async function exibirDetalhesSeason(id, season){
    let url = `https://api.themoviedb.org/3/tv/${id}/season/${season}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    return response.data;
}


async function request (url,query){
    return await axios.get(
        url,
        {
            params: {
                query: query
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );
}
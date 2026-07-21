import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

export async function searchSeries(query) {
    const url = `https://api.themoviedb.org/3/search/tv`;

    const response = await axios.get(
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

    return response.data.results;
}


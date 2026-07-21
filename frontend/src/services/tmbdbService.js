import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGUzMTlmNTZhZjI0YWE2MmIyNTYxZWFlNTNhNWQ2ZiIsIm5iZiI6MTc4NDIxOTI4NS40MzUwMDAyLCJzdWIiOiI2YTU5MDY5NTY2MjJlODg5ODQ0YTVlOTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.poGwFBjIUcg-revig676ewKX8W9jPG9aV_KFnS-7oGY";

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


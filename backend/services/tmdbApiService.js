
/* TODO: 1. Passar o TOKEN para backend
*   2. Testar requisição à API*/
export async function carregarDetalhesSeason(id, nmr_temporada) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${nmr_temporada}`;

    const response = await fetch(url)
    console.log(response);
    return response.json();
}
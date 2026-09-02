
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
}

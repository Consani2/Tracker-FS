
export function registrarUtilizador(nome, senha){
    fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nome: nome, senha: senha})
    }).then(response => response.json()).then(data => {
        console.log("Utilizador registrado com sucesso: ", data);
    }).catch(error => {
        console.log("Erro ao registrar o utilizador: ", error);
    })

}

export function logar(nomeLogin, senhaLogin) {
    //console.log("Logar foi clicado com sucesso", nomeLogin, senhaLogin)
    const url = `http://localhost:3000/api/login?nomeLogin=${nomeLogin}&senhaLogin=${senhaLogin}`

    fetch(url, {
        method: "POST",
        credentials:  "include"
    }).then(response => response.json()).then(data => {
            console.log("Dado: ", data)
        }).catch(error => {
            console.log("Erro ao realizar login: ", error)
    })
}
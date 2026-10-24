
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

export async function logar(nomeLogin, senhaLogin) {
    const url = "http://localhost:3000/api/login";

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomeLogin, senhaLogin }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao realizar login");
    }

    return data;
}
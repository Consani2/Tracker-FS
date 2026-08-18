
export function registrarUtilizador(nome, senha){
    fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nome: nome, senha: senha})
    }).then(response => response.json()).then(data => {
        console.log("Utilizador registrado com sucesso: ", data.user.id);
    }).catch(error => {
        console.log("Erro ao registrar o utilizador: ", error);
    })

}
//TODO: Adicionar requisição HTTP login (GET)
export function logar(nomeLogin, senhaLogin){
    //Captura utilizadores registados no localStorage e procura um utilizador com o mesmo nome e senha.
    /*fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })*/
    if(currentUser){
        alert(`Login efetuado com sucesso! Bem vindo ${currentUser.nome}!`)
    }else{
        alert("Nome de utilizador ou senha inválidos.");
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return currentUser;
}
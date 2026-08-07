//recebe um objeto de utilizador e armazena-o no localStorage.
export function registrarUtilizador(user){
    if(localStorage.getItem("users")=== null){

        localStorage.setItem("users", JSON.stringify([user]));
    }
    else {
        //transforma users em objeto JS, adiciona dados e, por último, transforma-os em ‘String’ para armazenar no localStorage
        localStorage.setItem("users", JSON.stringify([...JSON.parse(localStorage.getItem("users")), user]));
    }

}

//recebe nome e senha do login
//retorna objeto do utilizador atual, caso o login seja bem-sucedido, ou null caso contrário.
export function logar(nomeLogin, senhaLogin){
    //Captura utilizadores registados no localStorage e procura um utilizador com o mesmo nome e senha.
    const usersRegistrados = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = usersRegistrados.find(user=> user.nome === nomeLogin && user.senha === senhaLogin);
    if(currentUser){
        alert(`Login efetuado com sucesso! Bem vindo ${currentUser.nome}!`)
    }else{
        alert("Nome de utilizador ou senha inválidos.");
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return currentUser;
}
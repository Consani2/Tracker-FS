# Tracker de Filmes e Séries

Uma aplicação web Single-Page Application (SPA), desenvolvida com React, que permite pesquisar, explorar e acompanhar filmes e séries através da API do The Movie Database (TMDB).

> **Estado:** Em desenvolvimento

---

## Índice

- Problema que o Projeto Resolve
- Modo de Utilização da IA nesse Projeto
- Dificuldades Encontradas
- Instalação
- Utilização
- Arquitetura
- Fluxo da Aplicação
- Tecnologias
- APIs Externas
- Variáveis de Ambiente
- Contribuição

---
## Problema que o Projeto Resolve

## Modo de Utilização da IA nesse Projeto
## Como a IA foi utilizada

A inteligência artificial foi utilizada como principal ferramenta de geração de código ao longo do desenvolvimento deste projeto. A minha abordagem consistiu em definir as funcionalidades pretendidas, solicitar a sua implementação à IA e, posteriormente, estudar, analisar e adaptar o código gerado às necessidades da aplicação. Optei por explorar intensivamente esta abordagem, sem recorrer à escrita manual do código como método principal, com o objetivo de compreender até que ponto seria possível desenvolver uma aplicação desta forma e identificar as suas limitações.

À medida que o projeto evoluiu, surgiram problemas que a IA nem sempre conseguia resolver de forma satisfatória, sobretudo relacionados com a integração entre componentes, o fluxo e a modelação dos dados e a organização da arquitetura. A resolução dessas dificuldades exigiu pesquisas, leituras e estudos complementares, direcionando a minha aprendizagem para a compreensão global do sistema, das responsabilidades de cada componente e das relações entre as diferentes camadas da aplicação.

Embora o meu foco principal não tenha sido a escrita manual do código, procurei compreender as implementações geradas, aprofundando os detalhes técnicos sempre que surgiam erros ou comportamentos inesperados. Assim, a minha aprendizagem acompanhou o crescimento e o aumento da complexidade do projeto, contribuindo para desenvolver uma compreensão mais abrangente da arquitetura de software e uma maior capacidade de análise, diagnóstico e resolução de problemas (*troubleshooting*).

## Dificuldades Encontradas

## Instalação

**Pré-requisitos:**
- Node.js (>= 16)
- npm ou yarn

**Passos:**

1. Clonar o repositório:

   `git clone https://github.com/Consani2/Tracker-FS.git`

2. Aceder à pasta do projeto:

   `cd "Tracker Filmes e Series/Tracker Filmes e Series"`

3. Instalar as dependências:

   `npm install`

   ou

   `yarn`

4. Criar um ficheiro `.env` na raiz do projeto com a chave da API do TMDB (consultar a secção Variáveis de Ambiente).

5. Iniciar o servidor de desenvolvimento:

   `npm run dev`

   ou

   `yarn dev`

**Para gerar uma versão de produção:**

`npm run build`

ou

`yarn build`

---

## Utilização / Manual

- Abrir a aplicação no navegador (normalmente em `http://localhost:5173`).
- Utilizar a barra de pesquisa para encontrar filmes ou séries.
- Selecionar um conteúdo para consultar os seus detalhes (sinopse, data de lançamento, géneros e classificações).
- No caso das séries, navegar pelas temporadas e episódios a partir da página de detalhes.
- Utilizar a navegação do navegador ou o menu da aplicação para alternar entre páginas.

---

## Arquitetura

A aplicação utiliza React e segue uma arquitetura Single-Page Application (SPA), com a seguinte organização:

**Estrutura de pastas:**

- `src/`
  - `components/` — Componentes reutilizáveis da interface (listas, cartões e barra de pesquisa).
  - `pages/` — Páginas associadas às rotas da aplicação (Home, resultados de pesquisa e detalhes).
  - `services/` — Serviços responsáveis pela comunicação com as APIs, utilizando Axios.
  - `hooks/` — Hooks personalizados do React.
  - `assets/` — Imagens e outros recursos estáticos.
  - `styles/` — Estilos globais e específicos dos componentes.
  - `App.jsx` — Configuração das rotas e estrutura principal da aplicação.

Não é necessário um servidor backend: a aplicação comunica diretamente com a API REST do TMDB.

---

## Fluxo da Aplicação

1. O utilizador abre a aplicação e acede à página inicial (Home).
2. Introduz um termo na barra de pesquisa.
3. A aplicação realiza pedidos aos endpoints de pesquisa do TMDB através do cliente da API.
4. Os resultados são apresentados numa lista ou grelha de cartões.
5. O utilizador seleciona um conteúdo e é encaminhado para a página de detalhes através do sistema de rotas do React.
6. A página de detalhes carrega informações adicionais sobre o filme ou série, como a descrição, elenco e temporadas.
7. No caso das séries, o utilizador pode selecionar uma temporada para consultar os respetivos episódios e adicionar a série à sua lista.
8. O utilizador pode regressar à página anterior ou realizar uma nova pesquisa.
9. O utilizador pode registar os episódios assistidos, desde que a série esteja na sua lista. Esse registo é inserido na base de dados.

O estado da aplicação é gerido através do estado dos componentes e/ou do Context API do React. A obtenção de dados é realizada através de serviços que utilizam Axios.

---

## Tecnologias

- React (com Hooks)
- Vite (ferramenta de desenvolvimento e compilação)
- JavaScript (ES2020+)
- Axios (cliente HTTP)
- React Router (gestão de rotas)
- HTML5 e CSS3

---

## APIs Externas

A aplicação utiliza a API do The Movie Database (TMDB).

**Endpoints de pesquisa:**
- `/search/movie`
- `/search/tv`

**Endpoints de detalhes:**
- `/movie/{movie_id}`
- `/tv/{tv_id}`

**Endpoints adicionais:**
- `/movie/{id}/credits`
- `/tv/{id}/season/{season_number}`

**Documentação do TMDB:**  
https://developers.themoviedb.org/3

---

## Variáveis de Ambiente

Ao utilizar o Vite, a chave da API do TMDB pode ser definida através da seguinte variável:

`VITE_TMDB_API_KEY=your_tmdb_api_key_here`

**Exemplo de um ficheiro `.env`:**

`VITE_TMDB_API_KEY=abcd1234efgh5678`

Certificar-se de que o ficheiro `.env` está excluído do controlo de versões, adicionando-o ao `.gitignore`.

---

## Contribuição

O projeto encontra-se em desenvolvimento. Contribuições, sugestões e propostas de melhoria são bem-vindas.

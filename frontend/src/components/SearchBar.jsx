import {searchSeriesByName} from "../services/tmbdbService";

function SearchBar({ onSearch }) {

    async function handleSearch() {
        let nome = document.getElementById("nomeSerie").value;

        const result = await searchSeriesByName(nome);

        onSearch(result);
    }

    return (
        <div>
            <input
                id="nomeSerie"
                type="text"
                placeholder="Pesquisar séries..."
            />

            <button onClick={handleSearch}>
                Pesquisar
            </button>
        </div>
    );
}

export default SearchBar;
import SearchBar from "../components/SearchBar";
import ListaCards from "../components/SeriesCard";
import Teste from "../components/Teste.jsx";
import FavoriteColor from "../components/FavoriteColor.jsx";
import ExibirSeries from "../components/ExibirSeries.jsx";
import {useState} from "react";


function Home() {
    const [series, setSeries] = useState([])

    return (
        <div>
            <h1>Filme/Série</h1>


            <SearchBar onSearch={setSeries} />


            <ExibirSeries series={series}  />
        </div>

    );
}

export default Home;
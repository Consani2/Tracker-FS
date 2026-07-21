import {useEffect} from "react";

const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

function ExibirSeries({series}) {

    console.log(series)
    return <>
        {series.map((serie) => (
        <div key={serie.id}>
            <h2>{serie.name}</h2>
            <p>{serie.overview}</p>
        </div>
    ))}</>
}

export default ExibirSeries;
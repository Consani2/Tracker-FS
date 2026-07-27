import {useEffect} from "react";
import SeriesCard from "./SeriesCard.jsx";


function ExibirSeries({series}) {

    return <>{series.map((serie) => (
         <SeriesCard key={serie.id} series={serie} />
    ))}</>
}

export default ExibirSeries;
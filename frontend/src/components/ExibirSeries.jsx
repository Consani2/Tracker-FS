import {useEffect} from "react";
import SeriesCard from "./SeriesCard.jsx";


function ExibirSeries({series}) {
    //.log(series);
    return <>{series?.results?.map((serie) => (
         <SeriesCard key={serie.id} series={serie} />
    ))}</>
}

export default ExibirSeries;
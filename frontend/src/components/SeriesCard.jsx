import {useNavigate} from "react-router-dom";
import DetalhesSeries from "../pages/DetalhesSeries.jsx";

function SeriesCard({ series }) {

    const navegacao = useNavigate();
    return (
        <div>
            <button onClick={()=> navegacao(`/serie/${series.id}`)} >
                <a>{series.name}</a>
            </button>
        </div>
    )
}

export default SeriesCard;
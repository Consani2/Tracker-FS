import React, {useState} from "react";



function FavoriteColor() {
    const [color, setColor] = useState("cinza");
    return (
        <div>
            <p>Minha cor Favorita: {color}</p>
            <button onClick={()=> setColor("Vermelho")}>Mudar de Cor</button>
        </div>

    );
}

export default FavoriteColor;
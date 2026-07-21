import React from "react";
import ReactDOM from "react-dom/client";

const dish = React.createElement("h3", null, "Baked Salmon");
const dessert = React.createElement("h3", null, "Coconut Cream Pie");


function sobremesa(){

return (
    <>
        {dish}
        {dessert}
    </>
);
}
export default sobremesa;
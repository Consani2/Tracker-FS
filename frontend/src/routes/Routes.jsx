import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import DetalhesSeries from "../pages/DetalhesSeries.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import ListaSeries from "../pages/ListaSeries.jsx";
const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path ="/serie/:id" element={<DetalhesSeries />} />
            <Route exact path ="/login" element={<Login/>} />
            <Route exact path ="/registro" element={<Registro/>} />
            <Route exact path = "/lista_series" element={<ListaSeries/>} />


        </Routes>



    )
}
export default AppRoutes;
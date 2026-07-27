import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import DetalhesSeries from "../pages/DetalhesSeries.jsx";

const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path ="/serie/:id" element={<DetalhesSeries />} />

        </Routes>


    </BrowserRouter>
    )
}
export default AppRoutes;
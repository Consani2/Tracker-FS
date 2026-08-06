import { useState } from 'react'
import './App.css'
import Home from "./pages/Home.jsx";
import AppRoutes from "./routes/Routes.jsx";
import Navbar from "./components/Navbar.jsx";
import {useLocation} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const localizacao = useLocation()
  //const pagSemNavBar = ["/login", "/registro"]

  return (
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Home from "./pages/Home.jsx";
import AppRoutes from "./routes/Routes.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <AppRoutes />
  )
}

export default App

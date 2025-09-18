import { Routes, Route, Link } from 'react-router-dom'
import Menu from './pages/Menu'
import { useEffect, useState } from 'react'
import {supabasePizzas} from './supabase/SupabasePizzas'

function App() {

// pizzas from Supabase
  const [pizzas, setPizzas] = useState([]);

 useEffect(() => {
    async function fetchData() {
      const data = await supabasePizzas();
      setPizzas(data);
    }
    fetchData();
  }, []);
////
 
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-500 p-4 text-white text-xl font-bold">
        <Link to="/">Pizza App</Link>
      </header>

      <Routes>
        <Route path="/" element={<Menu pizzas={pizzas}/>} />
      </Routes>
    </div>
  )
}

export default App

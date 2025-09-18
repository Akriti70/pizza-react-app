import { Routes, Route, Link } from 'react-router-dom'
import Menu from './pages/Menu'
import { useEffect, useState } from 'react'
import { supabase } from './supabase/supabaseClient'

function App() {

// pizzas from Supabase
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let {data, error} = await supabase.from('pizzas').select('*');
    if (error) console.error(error);
    else {
      console.log('Fetched data:', data);
      setPizzas(data);
    }
  };
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

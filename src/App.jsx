import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import supabasePizzas from "./supabase/SupabasePizzas"
import Menu from "./pages/Menu"
import Profile from "./pages/Profile";
import Cart from "./pages/Cart"

export default function App() {
  //data for Pizzas
  const [pizzas,setPizzas]=useState([])
  useEffect(()=>{
    async function fetchData() {
      const data = await supabasePizzas()
      setPizzas(data)
      }
      fetchData()
  },[])
  ///
  //for CART
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) =>
    setCart((p) => {
      const existing = p.find((el) => el.id === pizza.id);
      if (existing) {
        return p.map((el) =>
          el.id === pizza.id ? {...el, qty: el.qty + 1} : el
        );
      }
      return [...p, {...pizza, qty: 1}];
    });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
         <Route path="/profile" element={<Profile />} />
            
            {/* Partner ke liye future routes */}
<Route 
  path="/menu" 
  element={<Menu pizzas={pizzas} addToCart={addToCart} className="p-10 text-3xl" />} 
/>            <Route path="/cart" element={<Cart pizzas={pizzas} cart={cart} />}/>
            <Route path="/checkout" element={<h1 className="p-10 text-3xl">Checkout Page ✅</h1>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}



 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import supabasePizzas from "./supabase/SupabasePizzas";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function App() {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await supabasePizzas();
      setPizzas(data);
    }
    fetchData();
  }, []);

  const addToCart = (pizza) =>
    setCart((prevCart) => {
      const existing = prevCart.find((el) => el.id === pizza.id);
      if (existing) {
        return prevCart.map((el) =>
          el.id === pizza.id ? { ...el, qty: el.qty + 1 } : el
        );
      }
      return [...prevCart, { ...pizza, qty: 1 }];
    });

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/menu"
              element={<Menu pizzas={pizzas} addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart pizzas={pizzas} cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<h1 className="p-10 text-3xl">Checkout Page ✅</h1>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

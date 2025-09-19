import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function App() {
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
            
            {/* Partner ke liye future routes */}
            <Route path="/menu" element={<h1 className="p-10 text-3xl">Menu Page 🍕</h1>} />
            <Route path="/cart" element={<h1 className="p-10 text-3xl">Cart Page 🛒</h1>} />
            <Route path="/checkout" element={<h1 className="p-10 text-3xl">Checkout Page ✅</h1>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}

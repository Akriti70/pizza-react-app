
import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to PizzaApp </h1>
      <p>Order your favorite pizzas with just a click! Fresh, hot, and delivered to your doorstep.</p>
      <Link to="/menu" className="order-btn">Order Now</Link>
    </div>
  )
}


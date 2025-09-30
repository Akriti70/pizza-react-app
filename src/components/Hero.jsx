
import { useState, useEffect } from "react";
import supabasePizzas from "../supabase/SupabasePizzas";
import "./Home.css";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchData() {
      const data = await supabasePizzas();
      setPizzas(data);
      setFilteredPizzas(data);
    }
    fetchData();
  }, []);

  function handleFilter(category) {
    setFilter(category);
    if (category === "All") {
      setFilteredPizzas(pizzas);
    } else {
      const filtered = pizzas.filter((pizza) => pizza.category === category);
      setFilteredPizzas(filtered);
    }
  }

  return (
    <div className="home-container">
      <h1>Our Menu</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Veg", "Non-Veg", "Special"].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pizza List */}
      <div className="pizza-grid">
        {filteredPizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <img src={pizza.image} alt={pizza.name} />
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <p>₹ {pizza.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

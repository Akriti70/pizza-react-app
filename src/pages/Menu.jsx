import { useState, useEffect, useMemo } from "react";
import PizzaCard from "../components/PizzaCard";
import "./Menu.css";

export default function Menu({ pizzas }) {
  const [pizzasState, setPizzasState] = useState(pizzas);
  const [priceState, setPriceState] = useState(true); // true = Low-High
  const [ingredientsState, setIngredientsState] = useState([]);
  const [pizzasOriginal, setPizzasOriginal] = useState(pizzas);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [popularityFilter, setPopularityFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPizzasOriginal(pizzas);
    setPizzasState(pizzas);
  }, [pizzas]);

  // Unique Ingredients
  const ingredientsAll = pizzas.flatMap((pizza) => pizza.ingredients);
  const newSetOfIngredients = [...new Set(ingredientsAll)];

  // Toggle Price Sorting
  const TogglePrice = () => {
    const result = [...pizzasState].sort((a, b) =>
      priceState ? a.price - b.price : b.price - a.price
    );
    setPizzasState(result);
    setPriceState(!priceState);
  };

  // Reset all filters
  const refresh = () => {
    setPizzasState(pizzasOriginal);
    setIngredientsState([]);
    setCategoryFilter("All");
    setPopularityFilter(false);
    setSearchTerm("");
    setPriceState(true);
  };

  // Toggle ingredient selection
  const ingredientToggle = (ing) => {
    setIngredientsState((prev) =>
      prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]
    );
  };

  // Apply filters and search
  const applyFilters = () => {
    let filtered = [...pizzasOriginal];

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Ingredients filter
    if (ingredientsState.length > 0) {
      filtered = filtered.filter((pizza) =>
        ingredientsState.every((ing) => pizza.ingredients.includes(ing))
      );
    }

    // Popularity filter
    if (popularityFilter) {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((pizza) =>
        pizza.name.toLowerCase().includes(lowerSearch)
      );
    }

    setPizzasState(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [ingredientsState, categoryFilter, popularityFilter, searchTerm]);

  const isSame = useMemo(() => {
    return (
      JSON.stringify(pizzasState) === JSON.stringify(pizzasOriginal) &&
      ingredientsState.length === 0 &&
      categoryFilter === "All" &&
      !popularityFilter &&
      searchTerm === "" &&
      priceState === true
    );
  }, [
    pizzasState,
    pizzasOriginal,
    ingredientsState,
    categoryFilter,
    popularityFilter,
    searchTerm,
    priceState,
  ]);

  return (
    <div className="menu-container">
      <h1 className="menu-title">🍕 Pizza Menu</h1>

      {/* Filters Row */}
      <div className="menu-filters-row">
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["All", "Veg", "Non-Veg"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}

          <button className="filter-btn" onClick={TogglePrice}>
            Price {priceState ? "⬆ Low-High" : "⬇ High-Low"}
          </button>

          <button
            className={`filter-btn ${popularityFilter ? "active" : ""}`}
            onClick={() => setPopularityFilter((prev) => !prev)}
          >
            ⭐ Popular
          </button>

          <button
            className={`filter-btn ${isSame ? "disabled" : ""}`}
            onClick={refresh}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Pizza Search */}
        <input
          type="text"
          placeholder="Search pizza..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Ingredients */}
      <div className="menu-ingredients">
        <p>Ingredients:</p>
        <div className="ingredients-grid">
          {newSetOfIngredients.map((ing, index) => (
            <button
              key={index}
              className={`menu-btn ${
                ingredientsState.includes(ing) ? "menu-active" : ""
              }`}
              onClick={() => ingredientToggle(ing)}
            >
              {ing}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-found">Pizzas found: {pizzasState.length}</div>

      {/* Pizza Grid */}
      <div className="grid">
        {pizzasState.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

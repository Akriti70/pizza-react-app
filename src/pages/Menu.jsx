import {useState, useEffect, useMemo} from 'react';
import PizzaCard from '../components/PizzaCard';
import './Menu.css';

export default function Menu({pizzas,addToCart}) {
  //useState for Pizzas
  const [pizzasState, setPizzasState] = useState(pizzas);
  //useState for toggle Price
  const [priceState, setPriceState] = useState(true);
  //Ingredients State
  const [ingredientsState, setIngredientsState] = useState([]);
  //new
  const [pizzasOriginal, setPizzasOriginal] = useState(pizzas);
  //useEffect for async data
  useEffect(() => {
    setPizzasOriginal(pizzas); //new
    setPizzasState(pizzas);
  }, [pizzas]);
  //Ingredients
  const ingredientsAll = pizzas.flatMap((pizza) => pizza.ingredients);
  const newSetOfIngredients = [...new Set(ingredientsAll)];

  //RENDER
  const render = pizzasState.map((pizza) => (
    <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart}/>
  ));
  // Toggle price
  const TogglePrice = () => {
    let result = pizzasState.toSorted((a, b) =>
      priceState ? a.price - b.price : b.price - a.price
    );
    setPizzasState(result);
    setPriceState(!priceState);
  };
  //Refresh
  const refresh = () => {
    setPizzasState(pizzas);
    setIngredientsState([]);
    setPriceState(true);
  };
  //Ingredient Toggle
  const ingredientToggle = (ing) => {
    setIngredientsState((prev) =>
      prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]
    );
  };
  //useEffect for console ingredientsState
  useEffect(() => {
  }, [ingredientsState]);
  //IngredientsFilter
  const ingredientsFilter = () => {
    let filteredResult = [...pizzasOriginal];

    if (ingredientsState.length > 0) {
      filteredResult = filteredResult.filter((pizza) =>
        ingredientsState.every((ing) => pizza.ingredients.includes(ing))
      );
    }

    setPizzasState(filteredResult);
  };
  //UseEffect for IngredientsFilter
  useEffect(() => {
    ingredientsFilter();
  }, [ingredientsState]);
  //for refresh Button
  const isSame = useMemo(() => {
    return (
      JSON.stringify(pizzasState) === JSON.stringify(pizzasOriginal) &&
      ingredientsState.length === 0 &&
      priceState === true
    );
  }, [pizzasState, pizzasOriginal, ingredientsState, priceState]);
  
  //RETURN
  return (
    <>
      <div className="menu-filters">Filters</div>

      <button className="menu-price" onClick={TogglePrice}>
        Price {priceState ? 'Low-High' : 'High-Low'}
      </button>
      <button
        className={`menu-refresh ${isSame ? 'not-active' : ''}`}
        onClick={refresh}
      >
        Refresh
      </button>

      <div className="menu-ingredients">
        Ingredients:
        <div>
          {newSetOfIngredients.map((ing, index) => (
            <button
              className={`menu-btn ${
                ingredientsState.includes(ing) ? 'menu-active' : ''
              }`}
              onClick={() => {
                ingredientToggle(ing);
              }}
              key={index}
            >
              {ing}
            </button>
          ))}
        </div>
      </div>
      <div className="menu-found">Pizzas found: {pizzasState.length}</div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {render}
      </div>
    </>
  );
}

import './Cart.css';
export default function Cart(props) {
  const {cart} = props;

  const quantityOfCart =
    cart.length > 0 && cart.reduce((acc, pizza) => acc + pizza.qty, 0);
  const totalPrice =
    cart.length > 0 &&
    cart.reduce((acc, pizza) => acc + pizza.price * pizza.qty, 0);

  const quantityCondition = quantityOfCart > 1 ? 'items' : 'item';

  return (
    <>
      <div className="cart-h1">Cart</div>
      <div className="cart-h2">
        Your Cart{' '}
        {cart.length === 0
          ? 'ís empty'
          : `has ${quantityOfCart} ${quantityCondition}`}
      </div>
      <div className="cart-total-price">
        {cart.length > 0 && `Total price is: ${totalPrice.toFixed(2)}$`}
      </div>

      <div className="cart-items-container">
        {cart.map((p) => (
          <div className="cart-item" key={p.id}>
            <img className="cart-image" src={p.image} />
            <div className="item-el">{p.name}</div>
            <div className="item-el">{p.price}$</div>
            <div className="item-el">Quantity: {p.qty}</div>
          </div>
        ))}
      </div>
    </>
  );
}

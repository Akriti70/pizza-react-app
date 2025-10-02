import { useState, useEffect } from "react";
import "./Cart.css";

export default function Cart({ cart = [], setCart }) {
  const [checkoutData, setCheckoutData] = useState({
    pin: "",
    city: "",
    paymentMethod: "Cash",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  // Load recent orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setRecentOrders(savedOrders);
  }, []);

  const quantityOfCart = cart.reduce((acc, pizza) => acc + pizza.qty, 0);
  const totalPrice = cart.reduce((acc, pizza) => acc + pizza.price * pizza.qty, 0);
  const quantityCondition = quantityOfCart > 1 ? "items" : "item";

  // Increment/Decrement
  const updateQty = (id, delta) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(newCart);
  };

  const removeItem = (id) => setCart(cart.filter((c) => c.id !== id));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formatted = value.replace(/\D/g, "").slice(0, 16);
      const spaced = formatted.replace(/(.{4})/g, "$1 ").trim();
      setCheckoutData((s) => ({ ...s, [name]: spaced }));
    } else {
      setCheckoutData((s) => ({ ...s, [name]: value }));
    }
  };

  const validateCheckout = () => {
    const { pin, city, paymentMethod, cardNumber, expiry, cvv } = checkoutData;
    const newErrors = {};
    if (!pin || !/^\d{4,6}$/.test(pin)) newErrors.pin = "PIN must be 4-6 digits";
    if (!city || city.trim().length < 2) newErrors.city = "City is required";
    if (paymentMethod === "Card") {
      if (!/^\d{4}\s\d{4}\s\d{4}\s\d{1,4}$/.test(cardNumber))
        newErrors.cardNumber = "Invalid card number";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "CVV must be 3-4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!validateCheckout()) return;
    setShowConfirm(true);
  };

  const confirmOrder = () => {
    setShowConfirm(false);
    setProcessing(true);

    const orderSummary = {
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        subtotal: i.price * i.qty,
      })),
      total: totalPrice.toFixed(2),
      city: checkoutData.city,
      pin: checkoutData.pin,
      paymentMethod: checkoutData.paymentMethod,
      timestamp: new Date().toISOString(),
      orderId: "FAKE-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
    };

    setTimeout(() => {
      setProcessing(false);
      setOrderSuccess(orderSummary);
      setCart([]);
      localStorage.setItem(
        "orders",
        JSON.stringify([orderSummary, ...recentOrders])
      );
      setCheckoutData({
        pin: "",
        city: "",
        paymentMethod: checkoutData.paymentMethod,
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
    }, 1400);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-h1">Cart</h1>
      <h2 className="cart-h2">
        {cart.length === 0
          ? "Your cart is empty"
          : `Your cart has ${quantityOfCart} ${quantityCondition}`}
      </h2>

      {cart.length > 0 && (
        <>
          <div className="cart-total-price">
            Total price: <span>{totalPrice.toFixed(2)}$</span>
          </div>

          <div className="cart-items-container">
            {cart.map((p) => (
              <div className="cart-item" key={p.id}>
                <img className="cart-image" src={p.image} alt={p.name} />
                <div className="item-el">{p.name}</div>
                <div className="item-el">{p.price}$</div>
                <div className="item-el quantity-container">
                  <button onClick={() => updateQty(p.id, -1)}>-</button>
                  <span className="qty-value">{p.qty}</span>
                  <button onClick={() => updateQty(p.id, 1)}>+</button>
                </div>
                <div className="item-el">
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(p.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-form">
            <div className="pin-city-row">
              <div>
                <input
                  type="text"
                  name="pin"
                  placeholder="PIN Code"
                  value={checkoutData.pin}
                  onChange={handleInputChange}
                  maxLength={6}
                />
                {errors.pin && <span className="error">{errors.pin}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={checkoutData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>

            <label className="payment-label">
              Payment method:
              <select
                name="paymentMethod"
                value={checkoutData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </label>

            {checkoutData.paymentMethod === "Card" && (
              <div className="card-fields">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number (fake)"
                  value={checkoutData.cardNumber}
                  onChange={handleInputChange}
                />
                {errors.cardNumber && (
                  <span className="error">{errors.cardNumber}</span>
                )}
                <div className="card-small-row">
                  <div>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={checkoutData.expiry}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                    {errors.expiry && <span className="error">{errors.expiry}</span>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={checkoutData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                </div>
                <div className="card-note">
                  This is a fake payment — no real charge will occur.
                </div>
              </div>
            )}

            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={processing || cart.length === 0}
            >
              {processing ? "Processing..." : `Checkout — ${totalPrice.toFixed(2)}$`}
            </button>
          </div>
        </>
      )}

     
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Your Order</h3>
            <p>Total: {totalPrice.toFixed(2)}$</p>
            <p>
              City: {checkoutData.city} — PIN: {checkoutData.pin}
            </p>
            <p>Payment: {checkoutData.paymentMethod}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={confirmOrder}>Confirm</button>
            </div>
          </div>
        </div>
      )}

    
      {orderSuccess && (
        <div className="order-success">
          <h3>Order placed successfully!</h3>
          <p>
            <strong>Order ID:</strong> {orderSuccess.orderId}
          </p>
          <p>
            <strong>Total:</strong> {orderSuccess.total}$
          </p>
          <p>
            <strong>City:</strong> {orderSuccess.city} — <strong>PIN:</strong>{" "}
            {orderSuccess.pin}
          </p>
          <p>
            <strong>Payment:</strong> {orderSuccess.paymentMethod}
          </p>

          <div className="order-items">
            <strong>Items:</strong>
            <ul>
              {orderSuccess.items.map((it) => (
                <li key={it.id}>
                  {it.name} x{it.qty} — {it.subtotal.toFixed(2)}$
                </li>
              ))}
            </ul>
          </div>

          <button className="primary-btn" onClick={() => setOrderSuccess(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

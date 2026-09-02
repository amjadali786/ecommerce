import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? (subtotal >= 2000 ? 0 : 199) : 0;
  const discount = subtotal >= 5000 ? 499 : 0;
  const totalPrice = subtotal + shipping - discount;

  return (
    <div className="cart-page">
      <div className="cart-shell">
        <section className="cart-main">
          <div className="cart-header">
            <div>
              <span className="page-kicker">Your bag</span>
              <h2>Shopping cart</h2>
            </div>
            <span className="cart-count">{itemCount} items</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>
                Add a few favorites and come back here to complete your perfect
                order.
              </p>
              <button className="primary-btn" onClick={() => navigate("/products")}>
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} width="100" />

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)} each</p>
                      </div>

                      <span className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>

        {cart.length > 0 && (
          <aside className="cart-sidebar">
            <div className="summary-card">
              <h3>Order summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong>
              </div>

              <div className="summary-row discount-row">
                <span>Discount</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>

              <div className="promo-box">
                <input type="text" placeholder="Promo code" />
                <button>Apply</button>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <div className="cart-actions">
                <button className="secondary-btn" onClick={() => navigate("/products")}>
                  Continue shopping
                </button>

                <button className="primary-btn" onClick={() => navigate("/checkout")}>
                  Checkout
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Cart;  
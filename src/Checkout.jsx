import { useCart } from "./CartContext";
import { useState } from "react";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Checkout() {
  const { cart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      id: Date.now(),
      customer: customer,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
      status: "Placed",
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    alert("Order placed successfully!");

    console.log("Order:", order);
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <h3>Customer Details</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={customer.pincode}
          onChange={handleChange}
          required
        />

        <div className="checkout-total-box">
          <h3>Total: {formatPrice(totalPrice)}</h3>
          <p>Secure checkout • Cash on delivery available</p>
        </div>

        <button type="submit" className="primary-btn">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
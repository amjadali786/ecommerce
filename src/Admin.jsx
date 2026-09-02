import { useState } from "react";
import products from "./data.json";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
 } from "recharts"; 
function Admin() {
  const [productList, setProductList] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts ? JSON.parse(savedProducts) : products;
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];
    // Product wise sales data for chart
  const productSales = productList.map((product) => {
    let quantity = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.id === product.id) {
          quantity += item.quantity;
        }
      });
    });

    return {
      name: product.name,
      sales: quantity,
    };
  });

  // Remove products which have no sales
  const salesChartData = productSales.filter(
    (product) => product.sales > 0
  );

  // Order data for chart
  const orderChartData = [
    {
      name: "Orders",
      orders: orders.length,
    },
  ];

  function handleChange(e) {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const updatedProducts = productList.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...selectedProduct,
            price: Number(selectedProduct.price),
          }
        : product
    );

    setProductList(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setSelectedProduct(null);

    alert("Product updated successfully!");
  }

  return (
    <div className="admin-page">
      <h1 style={{ color: "black" }}>Admin Panel</h1>
      <h2>Product Sales</h2>

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={salesChartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="sales" fill="#8884d8" />
  </BarChart>
</ResponsiveContainer>
      <h2>Orders</h2>

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={orderChartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="orders" fill="#82ca9d" />
  </BarChart>
</ResponsiveContainer>


      <h2 style={{ color: "black" }}>Products</h2> 

      <select
        value={selectedProduct ? selectedProduct.id : ""}
        onChange={(e) => {
          const product = productList.find(
            (item) => item.id === Number(e.target.value)
          );

          setSelectedProduct(
            product ? { ...product } : null
          );
        }}
      >
        <option value="">Select Product</option>

        {productList.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div style={{ marginTop: "20px", color: "black" }}>
          <h3>Edit Product</h3>

          <p>Product: {selectedProduct.name}</p>

          <input
            type="text"
            name="name"
            value={selectedProduct.name}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="number"
            name="price"
            value={selectedProduct.price}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="text"
            name="category"
            value={selectedProduct.category}
            onChange={handleChange}
          />

          <br />
          <br />

          <textarea
            name="description"
            value={selectedProduct.description}
            onChange={handleChange}
          />

          <br />
          <br />

          <button onClick={handleSave}>
            Save Changes
          </button>

          <button
            onClick={() => setSelectedProduct(null)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}

      <h2 style={{ color: "black", marginTop: "30px" }}>
        Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: "black" }}>
          No orders received yet.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{ color: "black", marginTop: "20px" }}
          >
            <hr />

            <h3>Order #{order.id}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {order.customer.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.customer.address}, {order.customer.city} -{" "}
              {order.customer.pincode}
            </p>

            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <h4>Products:</h4>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity} — ₹
                {item.price * item.quantity}
              </p>
            ))}

            <h3>Total: ₹{order.total}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin
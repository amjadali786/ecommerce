import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { useCart } from "./CartContext.jsx";

import products from "./data.json";
import Login from "./Login";
import Register from "./Register";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Admin from "./Admin";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Navbar() {
  const [search, setSearch] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  function handleSearch() {
    if (search.trim() !== "") {
      navigate("/products?search=" + search);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopEase
      </Link>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">🏠 Home</Link>
        </li>

        <li>
          <Link to="/products">🛍️ Products</Link>
        </li>

        <li>
          <Link to="/login">👤 Login</Link>
        </li>

        <li>
          <Link to="/register">✨ Register</Link>
        </li>

        <li>
          <Link to="/about">ℹ️ About</Link>
        </li>

        <li>
          <Link to="/terms">📜 Terms</Link>
        </li>

        <li>
          <Link to="/cart" className="cart-link">
            🛒 Cart <span>{cartCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h3>ShopEase</h3>

      <p>Your premium lifestyle store for modern living.</p>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/terms">Terms of Use</Link>
      </div>

      <p>© 2026 ShopEase. All rights reserved.</p>
    </footer>
  );
}

function Home() {
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Puma", "Sony"];
  const benefits = [
    { icon: "⚡", title: "Fast Delivery", text: "Same-day dispatch on selected items" },
    { icon: "🛡️", title: "Trusted Quality", text: "Only authentic and carefully checked products" },
    { icon: "🎁", title: "Exclusive Offers", text: "Premium deals for members and loyal shoppers" },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">NEW COLLECTION 2026</span>

          <h1>
            Upgrade your life with
            <span> essentials you’ll love</span>
          </h1>

          <p>
            Discover curated electronics, fashion, lifestyle picks, and everyday
            essentials brought together in one elevated shopping experience.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-btn">
              Shop Now
            </Link>

            <Link to="/about" className="hero-link">
              Explore More →
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>20k+</strong>
              <span>Happy buyers</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Customer rating</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>Quick shipping</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
            alt="Shopping collection"
          />
        </div>
      </section>

      <section className="benefits-strip">
        {benefits.map((item) => (
          <div key={item.title} className="benefit-item">
            <span>{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}

      <section className="section categories-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/products">View All →</Link>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to="/products"
              className="category-card"
              key={category.name}
            >
              <img src={category.image} alt={category.name} />

              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span>POPULAR PRODUCTS</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products">View All Products →</Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}

      <section className="promo-section">
        <div className="promo-content">
          <span>LIMITED TIME OFFER</span>

          <h2>Get the Best Deals on Your Favourite Products</h2>

          <p>
            Discover great products at great prices and make your shopping
            experience easier.
          </p>

          <Link to="/products" className="hero-btn">
            Explore Deals
          </Link>
        </div>
      </section>

      {/* BRANDS */}

      <section className="section brands-section">
        <h2 className="section-title">Popular Brands</h2>

        <div className="brands-grid">
          {brands.map((brand) => (
            <div className="brand-card" key={brand}>
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section className="about-home">
        <div className="about-content">
          <span>ABOUT SHOPEASE</span>

          <h2>Shopping Made Simple</h2>

          <p>
            ShopEase brings different products together in one simple and
            convenient online shopping experience.
          </p>

          <Link to="/about" className="about-btn">
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <Link to={"/product/" + product.id}>
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <span className="price">{formatPrice(product.price)}</span>

      <button className="buy-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
function Products() {
  const { cart, addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = new URLSearchParams(window.location.search);
  const search = searchParams.get("search") || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const productsPerPage = 20;

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <section className="products-page">
      <h1>All Products</h1>

      <p className="products-subtitle">
        Explore our complete collection of products.
      </p>

      <div className="products-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1
                  ? "active-page"
                  : ""
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function About() {
  const values = [
    {
      title: "Curated shopping",
      text: "Every item is selected to deliver better quality, smarter value, and a more enjoyable customer journey.",
    },
    {
      title: "Built for convenience",
      text: "We focus on a seamless online experience from discovery to checkout, making modern shopping effortless.",
    },
    {
      title: "Customer-first trust",
      text: "Quality, clarity, and dependable service are the foundations of every decision we make for our shoppers.",
    },
  ];

  return (
    <section className="rich-page about-page">
      <div className="page-hero">
        <div className="page-hero-copy">
          <span className="page-kicker">About ShopEase</span>
          <h1>Designed to make everyday shopping feel premium.</h1>
          <p>
            ShopEase brings together modern essentials, trend-driven picks, and
            lifestyle products in one elegant experience. Our mission is to make
            shopping simple, inspiring, and trustworthy for every customer.
          </p>
        </div>

        <div className="page-hero-panel">
          <div className="stat-box">
            <strong>20k+</strong>
            <span>Happy customers</span>
          </div>
          <div className="stat-box">
            <strong>48h</strong>
            <span>Fast shipping</span>
          </div>
          <div className="stat-box">
            <strong>4.9/5</strong>
            <span>Average rating</span>
          </div>
        </div>
      </div>

      <div className="content-grid three-up">
        {values.map((value) => (
          <article key={value.title} className="feature-card">
            <span className="feature-icon">✦</span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </div>

      <div className="story-block">
        <div className="story-text">
          <span className="page-kicker">Our story</span>
          <h2>We believe great shopping should feel effortless.</h2>
          <p>
            From the very beginning, ShopEase has focused on building a richer
            digital shopping experience that combines product discovery with
            confidence. We believe customers want more than just a catalog — they
            want a trustworthy brand, a beautiful interface, and a smooth path to
            purchase.
          </p>
          <p>
            That is why we keep our experience modern, approachable, and clearly
            designed around convenience, quality, and value.
          </p>
        </div>

        <div className="story-highlight">
          <h3>What makes us different</h3>
          <ul>
            <li>Thoughtfully selected products</li>
            <li>Clean, user-friendly browsing</li>
            <li>Secure, confidence-building checkout flow</li>
            <li>Modern shopping experience built for lifestyle brands</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section className="rich-page terms-page">
      <div className="page-hero compact">
        <div className="page-hero-copy">
          <span className="page-kicker">Terms of use</span>
          <h1>Clear policies for a safe, transparent shopping experience.</h1>
          <p>
            By using ShopEase, you agree to the site policies outlined below.
            These terms are designed to protect both customers and the brand while
            ensuring fair, secure, and transparent use of our platform.
          </p>
        </div>
      </div>

      <div className="content-grid terms-grid">
        <article className="info-card">
          <h3>1. Acceptable use</h3>
          <p>
            Our website is intended for lawful, personal, and commercial browsing
            in a way that respects the rights of other users, partners, and the
            brand itself. Any misuse, abuse, or unauthorized activity is strictly
            prohibited.
          </p>
        </article>

        <article className="info-card">
          <h3>2. Product information</h3>
          <p>
            Product names, descriptions, images, and pricing shown on the website
            are for demonstration and user experience purposes. While we aim to
            keep information accurate and current, details may change depending on
            stock, updates, or promotional adjustments.
          </p>
        </article>

        <article className="info-card">
          <h3>3. Orders and checkout</h3>
          <p>
            Customers are responsible for providing correct contact and shipping
            information. We reserve the right to verify details before fulfillment
            and may contact users if additional information is required for an
            order to be processed successfully.
          </p>
        </article>

        <article className="info-card">
          <h3>4. Privacy and data</h3>
          <p>
            We handle customer information responsibly and only use it for the
            purpose of providing services, order processing, communication, and
            site functionality. Please review our customer policies for greater
            clarity on how information is managed.
          </p>
        </article>

        <article className="info-card">
          <h3>5. Website changes</h3>
          <p>
            ShopEase may update, improve, or modify content, features, or policies
            over time. Continued use of the website indicates agreement with the
            latest version of these terms and related policies.
          </p>
        </article>

        <article className="info-card">
          <h3>6. Contact and support</h3>
          <p>
            If you have questions, concerns, or need support regarding orders,
            products, or site use, we encourage you to contact the brand directly
            through the customer support channels or communication points provided
            on the website.
          </p>
        </article>
      </div>
    </section>
  );
}

/*
This checks whether the user is logged in.
If not logged in, user will see Login page.
*/

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedInUser");

  if (!isLoggedIn) {
    return <Login />;
  }

  return children;
}

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const handleReset = (e) => {
    e.preventDefault();

    if (!username || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((entry) => entry.username === username);

    if (!user) {
      setMessage("No account found with that username.");
      setMessageType("error");
      return;
    }

    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Password reset successful. You can now log in.");
    setMessageType("success");
    setUsername("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-inner">
            <span className="eyebrow">Need help?</span>
            <h1>Reset your password securely.</h1>
            <p>
              Enter your username and choose a new password to regain access to
              your ShopEase account.
            </p>

            <ul className="auth-highlights">
              <li>Quick recovery</li>
              <li>Secure update</li>
              <li>Back to shopping</li>
            </ul>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-header">
            <span className="logo auth-logo">ShopEase</span>
            <h2>Forgot password</h2>
            <p>Choose a new password</p>
          </div>

          <form onSubmit={handleReset} className="auth-form">
            <div className="form-group">
              <label htmlFor="reset-username">Username</label>
              <input
                id="reset-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reset-password">New password</label>
              <input
                id="reset-password"
                type="password"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reset-confirm-password">Confirm password</label>
              <input
                id="reset-confirm-password"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-button">
              Reset password
            </button>
          </form>

          {message && (
            <p className={`auth-message ${messageType}`}>
              {message}
            </p>
          )}

          <p className="auth-switch">
            Remembered it? <Link to="/login">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Admin />} />

        <Route path="/about" element={<About />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
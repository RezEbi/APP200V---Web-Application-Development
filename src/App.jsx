import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import BookTable from "./pages/BookTable";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import { useAuth } from "./state/AuthContext";
import Footer from "./components/Footer";

function AdminProtected() {
  const { user, loading } = useAuth();

  if (loading) return <p className="container">Laster…</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Admin />;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/order" element={<Order />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/book" element={<BookTable />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminProtected />} />
      </Routes>
      
      <Footer/>
    </>
  );
}

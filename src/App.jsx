import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing";
import Payement from "./pages/Payement";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import Error from "./pages/Error";
import Account from "./pages/Account";
import { auth } from "./components/Firebase";
import { useLocation } from "react-router";
import WishList from "./pages/WishList";
import Contact from "./Contact";

const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Auth error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe(); // ← Correct cleanup
  }, []);

  if (loading)
    return <div className="text-center font-bold mb-30 mt-30">Loading...</div>;

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/payment" element={<Payement />} /> {/* Fixed typo */}
        <Route
          path="/login"
          element={user ? <Navigate to="/account" /> : <Login />}
        />
        <Route path="wish" element={<WishList />} />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/login" />}
        />
        <Route path="rat" element={<Login/>}/>
        <Route path="/create" element={<CreateAcc />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};
export default App;

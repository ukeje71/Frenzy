import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
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
import WishList from "./pages/WishList";
import Contact from "./Contact";
import NewProducts from "./pages/NewProducts";

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
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loader"></div>;

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/create", "/contact"];

  // Create a protected route component
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!user && !publicRoutes.includes(location.pathname)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/account" /> : <Login />}
        />
        <Route path="/create" element={<CreateAcc />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wish"
          element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <NewProducts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;

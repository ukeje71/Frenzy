import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing";
import Payement from "./pages/Payement";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import Error from "./pages/Error";
import Account from "./pages/Account";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/payement" element={<Payement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAcc />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;

import { signInWithEmailAndPassword } from "firebase/auth";
import { FacebookIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successful! Redirecting...", {
      position: "top-center",
      autoClose: 2000,
    });
    // Redirect after 2 seconds
    setTimeout(() => navigate("/account"), 2000);
  } catch (error) {
    console.error("Login error:", error); // Keep for debugging
    
    let friendlyMessage = "Login failed"; // Default fallback
    const errorCode = error.code;

    // Custom messages for common Firebase errors
    const errorMap = {
      "auth/invalid-email": " Invalid email format",
      "auth/user-disabled": "Account disabled. Contact support",
      "auth/user-not-found": " No account found with this email",
      "auth/wrong-password": "Incorrect password. Try again or reset password",
      "auth/too-many-requests": " Too many attempts. Try again later",
      "auth/network-request-failed": " Check your Network"
    };

    friendlyMessage = errorMap[errorCode] || "Login failed. Please try again";

    toast.error(friendlyMessage, {
      position: "top-center",
      autoClose: 5000,
      style: {
        background: '#ff4d4f',
        color: 'white',
        fontWeight: 'bold',
      },
      icon: "❌"
    });

    // Special case: Suggest password reset
    if (errorCode === "auth/wrong-password") {
      setTimeout(() => {
        toast.info("Forgot password? Click here to reset", {
          position: "top-center",
          autoClose: 5000,
          onClick: () => window.location.href = "/reset-password",
          style: { 
            cursor: 'pointer',
            background: '#1890ff',
          }
        });
      }, 1500);
    }
  }
};
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>
      <div className="flex justify-center items-center w-full  bg-white p-4">
        <div className="bg-[#008f96] form w-full max-w-md p-6 rounded-xl shadow-lg overflow-auto max-h-screen">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-white text-base"
          >
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-lg  font-extrabold">
                Email
              </label>
              <input
                required
                type="email"
                id="Email"
                placeholder="someone@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="secured  outline-none border-2 rounded-lg p-2"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="password" className="text-lg  font-extrabold">
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="secured  outline-none border-2 rounded-lg p-2"
              />
            </fieldset>

            <button
              type="submit"
              className="w-full p-3 rounded-xl bg-[#fff] text-black font-semibold  transition"
            >
              Submit
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
            <button className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white">
              <span className="font-extrabold text-3xl text-[#3b5998]">G</span>
              <span className="text-black font-medium"> Google</span>
            </button>

            <button className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white">
              <FacebookIcon size={30} className="text-[#3b5998] " />
              <span className="text-black font-medium"> Facebook</span>
            </button>
          </div>

          <Link to="/create">
            <p className="pt-6 text-center text-white underline text-sm">
              Don’t have an account? Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

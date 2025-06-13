import { signInWithEmailAndPassword } from "firebase/auth";
import { FacebookIcon, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        "auth/wrong-password":
          "Incorrect password. Try again or reset password",
        "auth/too-many-requests": " Too many attempts. Try again later",
        "auth/network-request-failed": " Check your Network",
      };

      friendlyMessage = errorMap[errorCode] || "Login failed. Please try again";

      toast.error(friendlyMessage, {
        position: "top-center",
        autoClose: 5000,
        style: {
          background: "#ff4d4f",
          color: "white",
          fontWeight: "bold",
        },
        icon: "❌",
      });

      // Special case: Suggest password reset
      if (errorCode === "auth/wrong-password") {
        setTimeout(() => {
          toast.info("Forgot password? Click here to reset", {
            position: "top-center",
            autoClose: 5000,
            onClick: () => (window.location.href = "/reset-password"),
            style: {
              cursor: "pointer",
              background: "#1890ff",
            },
          });
        }, 1500);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>
      <div className="flex justify-center items-center w-full  bg-white p-4">
        <div className="bg-white form w-full max-w-md p-6 rounded-xl shadow-lg overflow-auto max-h-screen">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#008f96]">
            Sign In
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
            <button
              className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white"
              // onClick={signInWithFirebase}
            >
              <span className="font-extrabold text-3xl text-black">G</span>
              <span className="text-black font-medium"> Google</span>
            </button>

            <button className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white">
              <FacebookIcon size={30} className="text-black " />
              <span className="text-black font-medium"> Facebook</span>
            </button>
          </div>
          <div className="flex flex-row gap-2 text-sm md :gap-10 items-center mt-5 mb-5 justify-center">
            <div className="w-20 h-0.5 bg-gray-400 "></div>
            <p className="text-gray-600 text-center ">Register via email</p>
            <div className="w-20 h-0.5 bg-gray-400 "></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-white text-base"
          >
            <div className="flex flex-row  border-0 rounded-lg p-2 bg-[#ccc] gap-4 text-black">
              <Mail />
              <input
                required
                type="text"
                id="lastname"
                placeholder="User@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className=" secured outline-none w-full"
              />
            </div>

            <div className="flex flex-row  border-0 rounded-lg p-2 bg-[#ccc] gap-4 text-black">
              <Lock />
              <input
                required
                type="text"
                id="lastname"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className=" secured outline-none w-full"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-50 p-3 rounded-3xl bg-[#008f96]  text-white font-semibold self-center shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/create">
            <p className="pt-6 text-center text-black underline text-sm">
              Don’t have an account? Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

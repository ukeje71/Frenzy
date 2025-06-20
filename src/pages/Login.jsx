import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Facebook, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/account"), 2000);
    } catch (error) {
      console.error("Login error:", error);
      let friendlyMessage = "Login failed";
      const errorCode = error.code;

      const errorMap = {
        "auth/invalid-email": "Invalid email format",
        "auth/user-disabled": "Account disabled. Contact support",
        "auth/user-not-found": "No account found with this email",
        "auth/wrong-password": "Incorrect password. Try again or reset password",
        "auth/too-many-requests": "Too many attempts. Try again later",
        "auth/network-request-failed": "Check your Network",
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

      if (errorCode === "auth/wrong-password") {
        setTimeout(() => {
          toast.info("Forgot password? Click here to reset", {
            position: "top-center",
            autoClose: 5000,
            onClick: () => navigate("/reset-password"),
            style: {
              cursor: "pointer",
              background: "#1890ff",
            },
          });
        }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/account"), 2000);
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google login failed. Please try again", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#008f96]">
            Welcome Back
          </h1>
          
          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <button
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50"
            >
              <p className="w-5 h-5 text-[#4285F4]">G</p>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button
              disabled={isLoading}
              className="flex items-center justify-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50"
            >
              <Facebook className="w-5 h-5 text-[#1877F2]" />
              <span className="text-gray-700 font-medium">Continue with Facebook</span>
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="text-gray-700 text-sm font-medium">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#008f96] focus-within:border-transparent transition-all">
                <Mail className="text-gray-500 w-5 h-5" />
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-3 outline-none w-full bg-transparent text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#008f96] focus-within:border-transparent transition-all">
                <Lock className="text-gray-500 w-5 h-5" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-3 outline-none w-full bg-transparent text-gray-800 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/reset-password"
                  className="text-sm text-[#008f96] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 rounded-lg bg-[#008f96] hover:bg-[#007a80] text-white font-semibold shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Signing In...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/create"
              className="text-[#008f96] font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
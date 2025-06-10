// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FacebookIcon } from "lucide-react";
import React, { useState } from "react";
// import { auth, db } from "./Firebase";
import { Link } from "react-router";
// import { toast } from "react-toastify";
// import { GoogleAuthProvider } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

const Login = () => {
const [email ,setEmail] =useState("");
const [password ,setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("Successfully Logged In");
//       toast.success("Successfully Logged In", {
//         position: "top-center",
//       });
//       window.location.href = "/blogs";
//     } catch (error) {
//       console.log(error.message);
//       toast.dismiss(); // Prevent multiple toasts
//       if (error.code === "auth/email-already-in-use") {
//         toast.error("This email is already registered");
//       } else if (error.code === "auth/invalid-email") {
//         toast.error("Invalid email format");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };
//   const signInWithFirebase = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then(async (res) => {
//         console.log(res);
//         toast.success("User successfully signed in");
//         window.location.href = "/blogs";

//         // Optional: Store user data in Firestore
//         const user = res.user;
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstname: user.displayName?.split(" ")[0] || "",
//           lastname: user.displayName?.split(" ")[1] || "",
//           provider: "google",
//         });
//       })
//       .catch((err) => {
//         console.log(err.message);
//         toast.error("Google sign-in failed");
//       });
//   };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-[#008f96] w-full max-w-md p-6 rounded-xl shadow-lg overflow-auto max-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Log In
        </h1>

        <form
        //   onSubmit={handleSubmit}
          className="space-y-6 text-white text-base"
        >
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg  font-extrabold">
              Username
            </label>
            <input
              required
              type="email"
              id="username"
              placeholder="Username or Email"
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
              onChange={(e) =>setPassword (e.target.value)}
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
          <button
            className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white"
            // onClick={signInWithFirebase}
          >
            <span className="font-extrabold text-3xl text-[#3b5998]">G</span>
            <span className="text-black font-medium"> Google</span>
          </button>

          <button className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl w-full sm:w-60 bg-white">
            <FacebookIcon size={30} className="text-[#3b5998] " />
            <span className="text-black font-medium"> Facebook</span>
          </button>
        </div>

        <Link to="/create">
          <p className="pt-6 text-center text-white-600 underline text-sm">
            Don’t have an account? Sign up
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

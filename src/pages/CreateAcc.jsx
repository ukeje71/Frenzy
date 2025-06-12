import { FacebookIcon, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
const CreateAcc = () => {
  const navigate = useNavigate();

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // EMAIL & password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstname: Fname,
          lastname: Lname,
          password: password,
        });
      }
      console.log("User Successfully Created");
      toast.success("User Successfully Created");
      navigate("/Login");
    } catch (error) {
      // Custom error handling
      let errorMessage;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already registered. Try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Check your internet connection.";
          break;
        default:
          errorMessage = "Signup failed. Please try again.";
          console.error("Firebase error:", error.message); // Log full error for debugging
      }
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>
      <div className="flex justify-center items-center w-full  bg-white p-4">
        <div className=" bg-white form w-full max-w-md p-6 rounded-xl shadow-2xl overflow-auto max-h-screen">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#008f96]">
            Create Account
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
            className="text-white text-base space-y-4 flex flex-col gap-5"
          >
            {/* <fieldset className="flex flex-col">
              <label htmlFor="firstname" className="text-lg  font-extrabold">
                First Name
              </label> */}
              <div className="flex flex-row  border-0 rounded-lg p-2 bg-[#ccc] gap-4 text-black">
                <User />
                <input
                  required
                  type="text"
                  id="lastname"
                  placeholder="First Name"
                  onChange={(e) => setFname(e.target.value)}
                  className=" secured outline-none w-full"
                />
              </div>
            {/* </fieldset> */}

            {/* <fieldset className="flex flex-col">
              <label htmlFor="lastname" className="text-lg  font-extrabold">
                Last Name
              </label> */}
              <div className="flex flex-row  border-0 rounded-lg p-2 bg-[#ccc] gap-4 text-black">
                <User />
                <input
                  required
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  onChange={(e) => setLname(e.target.value)}
                  className=" secured outline-none w-full"
                />
              </div>
            {/* </fieldset> */}

            {/* <fieldset className="flex flex-col">
              <label htmlFor="email" className="text-lg  font-extrabold">
                Email
              </label> */}
              <div className="flex flex-row  border-0 rounded-lg p-2 bg-[#ccc] gap-4 text-black">
                <Mail/>
                <input
                  required
                  type="text"
                  id="lastname"
                  placeholder="User@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" secured outline-none w-full"
                />
              </div>
            {/* </fieldset> */}

            {/* <fieldset className="flex flex-col">
              <label htmlFor="password" className="text-lg  font-extrabold">
                Password
              </label> */}
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
            {/* </fieldset> */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-50 p-3 rounded-3xl bg-[#008f96]  text-white font-semibold self-center shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>

          <Link to={"/Login"}>
            <p className="pt-6 text-center text-white underline text-sm">
              Already have an account? Sign in
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAcc;

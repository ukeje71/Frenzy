import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { User2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Account = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  async function handleLogOut() {
    try {
      await auth.signOut();
      setTimeout(() => navigate("/login"), 2000);
      console.log("User successfully Signed Out");
      toast.success("User successfully signed Out");
    } catch (error) {
      console.log("Error Signing Out", error.message);
    }
  }
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Billing_details */}
      <section className="w-full p-4">
        <figure className="flex text-gray-600 flex-row gap-3 mb-4 mt-4">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          /
          <NavLink to="/account">
            <p>Address & Billing</p>
          </NavLink>
        </figure>

        <section className="pt-10 lg:w-[70vw] m-auto">
          <h2>Account Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : userDetails ? (
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-5 items-center">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                        Username
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                        {userDetails.firstname} + {userDetails.lastname}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                        Email
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                        {userDetails.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                        Password
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                        ••••••••
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                        Phone Number
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                        {userDetails.phoneNumber}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center flex flex-col gap-3 items-center mb-10">
                <div className="bg-gray-200 h-35 w-30 flex items-center justify-center">
                  <User2
                    size={80}
                    className="text-green-500 font-extralight w-20"
                  />
                </div>
                <p className="border-1 border-gray-300 px-3 py-2 rounded-sm text-sm w-fit">
                  Select Image
                </p>
                <p>File size maximum 1MB</p>
                <p>Allowed file types: JPG, PNG, GIF</p>
              </div>
              <button
                onClick={handleLogOut}
                className="bg-green-500 text-white p-2 rounded-sm mt-4 cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <p>No user data found</p>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="bg-green-500 text-white p-2 rounded-sm mt-4 cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default Account;

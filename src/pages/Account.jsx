import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import PhotoUpload from "../components/PhotoUpload";
import { User, Mail, Lock, Phone, LogOut } from "lucide-react";

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
      toast.success("Successfully signed out");
    } catch (error) {
      console.log("Error Signing Out", error.message);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className="w-full p-4 md:p-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <NavLink to="/" className="hover:text-green-600 transition-colors">
              Home
            </NavLink>
            <span className="mx-2">/</span>
            <span className="font-medium text-green-600">Account</span>
          </div>
        </div>

        {/* Account Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
                <p className="text-gray-600 mt-1">View and manage your account information</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <PhotoUpload />
                <button
                  onClick={handleLogOut}
                  className="flex items-center bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : userDetails ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Info Card */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <User className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Full Name</h3>
                        <p className="text-lg font-medium text-gray-800">
                          {userDetails.firstname} {userDetails.lastname}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Email Address</h3>
                        <p className="text-lg font-medium text-gray-800">
                          {userDetails.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Password Card */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Lock className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Password</h3>
                        <p className="text-lg font-medium text-gray-800">
                          ••••••••
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <Phone className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Phone Number</h3>
                        <p className="text-lg font-medium text-gray-800">
                          {userDetails.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No user data found</p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Account;
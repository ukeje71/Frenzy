import React, { useState } from "react";
import {
  Home,
  Briefcase,
  BarChart2,
  Banknote,
  Calendar,
  Mail,
  MessageSquare,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Heart,
  Search,
  User,
  ShoppingBag,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import useCartStore from "./store/CartStore";
import useSearchStore from "./store/SearchStore";
import useWishlistStore from "./store/WishlistStore";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { setSearchQuery } = useSearchStore();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism Header Bar */}
      <div className="backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo with improved styling */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ShoppingBag className="text-green-600 w-8 h-8" />
            <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Frenzy
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Enhanced Search Bar */}
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500 h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 rounded-full bg-white/70 focus:bg-white focus:ring-2 ring-green-500 border-green-500 border-1 outline-none transition-all duration-200"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Action Icons with improved counters */}
            <div className="flex items-center space-x-5">
              <button
                onClick={() => navigate("/wish")}
                className="relative p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <Heart className="text-gray-700 w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <ShoppingCart className="text-gray-700 w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/login")}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <User className="text-gray-700 w-6 h-6" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors"
            onClick={toggleMenu}
          >
            <Menu className="text-gray-700 w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu with improved glassmorphism */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-xl shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full overflow-y-auto p-6">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <ShoppingBag className="text-green-600 w-8 h-8" />
                  <h1 className="ml-2 text-2xl font-bold text-gray-800">Frenzy</h1>
                </div>
                <button onClick={toggleMenu} className="p-1">
                  <X className="text-gray-500 w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-8 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-500 h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Menu Sections */}
              <div className="space-y-8">
                {/* General Section */}
                <div>
  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
    General
  </h2>
  <ul className="space-y-1">
    {[
      {
        icon: <Home className="w-5 h-5" />,
        text: "Home",
        path: "/",
        end: true  // Add this for exact matching
      },
      {
        icon: <Briefcase className="w-5 h-5" />,
        text: "New Product",
        path: "/new"
      },
      {
        icon: <BarChart2 className="w-5 h-5" />,
        text: "Analytics",
        path: "/analytics"
      },
      {
        icon: <Banknote className="w-5 h-5" />,
        text: "Banking",
        path: "/banking"
      },
      {
        icon: <Calendar className="w-5 h-5" />,
        text: "Booking",
        path: "/booking"
      },
    ].map((item) => (
      <li key={item.text} className="group">  {/* Added group class here */}
        <NavLink
          to={item.path}
          end={item.end}  // Use end prop for exact matching
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
          onClick={toggleMenu}
        >
          {({ isActive }) => (
            <>
              {React.cloneElement(item.icon, {
                className: `w-5 h-5 ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-500 group-hover:text-green-500"
                }`
              })}
              <span className="text-sm font-medium">{item.text}</span>
            </>
          )}
        </NavLink>
      </li>
    ))}
  </ul>
</div>

                {/* Management Section */}
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                    Management
                  </h2>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/account"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-green-50 text-green-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                        onClick={toggleMenu}
                      >
                        {({ isActive }) => (
                          <>
                            <User className={`w-5 h-5 ${
                              isActive
                                ? "text-green-600"
                                : "text-gray-500 group-hover:text-green-500"
                            }`} />
                            <span className="text-sm font-medium">User</span>
                          </>
                        )}
                      </NavLink>
                    </li>

                    <li>
                      <div className="relative">
                        <button
                          onClick={toggleDropdown}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            dropdownOpen ? "bg-gray-50" : "hover:bg-gray-50"
                          } text-gray-600`}
                        >
                          <Briefcase className={`w-5 h-5 ${
                            dropdownOpen
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`} />
                          <span className="text-sm font-medium flex-1 text-left">
                            Admin
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              dropdownOpen ? "rotate-180" : ""
                            } text-gray-400 group-hover:text-gray-600`}
                          />
                        </button>

                        {dropdownOpen && (
                          <ul className="ml-10 mt-1 space-y-1 bg-gray-50 rounded-lg p-2 animate-fadeIn">
                            {[
                              { text: "Shop", path: "/" },
                              { text: "Cart", path: "/cart" },
                              { text: "Wishlist", path: "/wish" },
                              { text: "Invoices", path: "#" },
                            ].map((item) => (
                              <li key={item.text}>
                                <NavLink
                                  to={item.path}
                                  className={({ isActive }) =>
                                    `block px-3 py-1.5 text-sm rounded transition-colors ${
                                      isActive
                                        ? "bg-green-100 text-green-600"
                                        : "hover:bg-gray-100 text-gray-600"
                                    }`
                                  }
                                  onClick={toggleMenu}
                                >
                                  {item.text}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Other Section */}
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                    Other
                  </h2>
                  <ul className="space-y-1">
                    {[
                      {
                        icon: <Mail className="w-5 h-5" />,
                        text: "Mail",
                        path: "#",
                      },
                      {
                        icon: <MessageSquare className="w-5 h-5" />,
                        text: "Contact",
                        path: "/contact",
                      },
                      {
                        icon: <Calendar className="w-5 h-5" />,
                        text: "Ecommerce",
                        path: "#",
                      },
                    ].map((item) => (
                      <li key={item.text}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              isActive
                                ? "bg-green-50 text-green-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                          onClick={toggleMenu}
                        >
                          {({ isActive }) => (
                            <>
                              {React.cloneElement(item.icon, {
                                className: `w-5 h-5 ${
                                  isActive
                                    ? "text-green-600"
                                    : "text-gray-500 group-hover:text-green-500"
                                }`
                              })}
                              <span className="text-sm font-medium">{item.text}</span>
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/create");
                    toggleMenu();
                  }}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
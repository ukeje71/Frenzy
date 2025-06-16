import React, { useState } from "react";
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChartSplineIcon,
  CircleGaugeIcon,
  Landmark,
  UserCircle,
  ShoppingCart,
  Menu,
  X,
  Calendar1,
  ChevronDown,
  HeartIcon,
  MailOpenIcon,
  MessageSquareIcon,
  Search,
  User2,
} from "lucide-react";

import useCartStore from "./store/CartStore";

import { NavLink, useNavigate } from "react-router";
import useSearchStore from "./store/SearchStore";
import useWishlistStore from "./store/WishlistStore";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };
  const { cart } = useCartStore();
  const { WishList } = useWishlistStore();
  const { setSearchQuery } = useSearchStore();
  return (
    <section className="w-full border-b-gray-600 border-b-1 fixed top-0 z-[1000] ">
      <div className="flex justify-between  p-4 md:w-[700px] lg:w-full m-auto h-[6rem] items-center  inset-0 backdrop-blur-sm bg-white/30">
        <h1 className=" text-2xl logo ">Frenzy</h1>
        <nav className="hidden flex-row items-center  md:flex gap-4 ">
          <div className="hidden md:flex  lg:w-70 border-1 px-4 py-2 text-center bg-[#ECEBEB] rounded-full items-center  border-none">
            <input
              className="border-0 outline-0 w-full"
              type="search"
              name="search"
              id="search"
              placeholder="What are you looking for"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="border-0 outline-0">
              <Search />
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="relative"
              onClick={() => {
                navigate("./wish");
              }}
            >
              <HeartIcon size={30} />
              <p className="bg-red-600 text-white rounded-full text-center w-5 px-1 py-0.5 text-xs font-bold absolute right-0 bottom-3">
                {cart.length}
              </p>
            </button>
            <button
              className="relative"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ShoppingCart size={30} />
              <p className="bg-red-600 text-white rounded-full text-center w-4 px-1 py-0.5 text-xs font-bold absolute right-0 bottom-3">
                {cart.length}
              </p>
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              <User2 size={30} />
            </button>
          </div>
        </nav>
        {/* Hamburger Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={` overflow-y-scroll fixed top-0 left-0 h-full w-2/3 max-w-sm bg-white px-6 text-gray-600 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-4  flex justify-between items-center ">
          <h2 className="font-bold text-xl">General</h2>
        </div>
        <ul className="mt-4">
          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <CircleGaugeIcon />
            <p>App</p>
          </li>

          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <BriefcaseIcon />
            <p>Ecommerce</p>
          </li>

          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <ChartSplineIcon />
            <p>Analytics</p>
          </li>

          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <Landmark />
            <p>Banking</p>
          </li>

          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <BriefcaseBusiness />
            <p>Booking</p>
          </li>
        </ul>
        <ul>
          <h2 className=" font-bold text-2xl mt-5">Management</h2>
          <NavLink to={"/account"}>
            <li
              className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
              onClick={toggleMenu}
            >
              <UserCircle />
              <p>User</p>
            </li>
          </NavLink>
          <span className="relative inline-block text-left transition-transform duration-300 ease-in-out">
            <button
              onClick={toggleDropdown}
              className="font-semibold  gap-4 outline-none flex flex-row items-center mt-4"
            >
              <BriefcaseBusiness />
              <p>Admin</p>
              <ChevronDown />
            </button>

            {open && (
              <ul className="ml-10 mt-1 space-y-1 bg-gray-50 rounded-lg p-2 animate-fadeIn">
                <NavLink to={"/"}>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Shop
                  </li>
                </NavLink>
                <NavLink to={"/cart"}>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Cart
                  </li>
                </NavLink>
                <NavLink to={"/wish"}>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Wishlist
                  </li>
                </NavLink>
                <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                  Invoices
                </li>
              </ul>
            )}
          </span>
        </ul>

        <ul>
          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <MailOpenIcon />
            <p>App</p>
          </li>
          <NavLink to={"/contact"}>
            <li
              className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
              onClick={toggleMenu}
            >
              <MessageSquareIcon />
              <p>Contact</p>
            </li>
          </NavLink>

          <li
            className="flex flex-row items-center gap-4 mt-4 cusor-pointer"
            onClick={toggleMenu}
          >
            <Calendar1 />
            <p>Ecommerce</p>
          </li>
        </ul>
        <div className="flex flex-col gap-4 p-4 mt-4">
          <button
            onClick={() => {
              navigate("/Login");
              toggleMenu();
            }}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/create");
              toggleMenu();
            }}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;

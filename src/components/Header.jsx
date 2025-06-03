import { HeartIcon, Search, User2 } from "lucide-react";
import React, { useState } from "react";
import { Phone, ShoppingCart, Menu, X } from "lucide-react";

import { NavLink, useNavigate } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <section className="w-full border-b-gray-600 border-b-1">
      <div className="flex justify-between  p-4 md:w-[700px] lg:w-[1100px] m-auto h-[6rem] items-center">
        <h1 className="font-extrabold text-2xl logo ">Frenzy</h1>
        <nav className="hidden flex-row items-center md:flex gap-4 ">
          <div className="hidden md:flex  border-1 px-4 py-2 text-center rounded-xl items-center  border-gray-500">
            <input
              className="border-0 outline-0"
              type="search"
              name="search"
              id="search"
              placeholder="What are you looking for"
            />
            <button className="border-0 outline-0">
              <Search />
            </button>
          </div>

          <div className="flex gap-4">
            <span className="relative">
              <HeartIcon size={30} />
              <p className="bg-red-600 text-white rounded-full text-center w-5 absolute right-0 bottom-3">
                1
              </p>
            </span>
            <ShoppingCart size={30} />
            <User2 size={30} />
          </div>
        </nav>
        {/* Hamburger Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4  transition-all">
          <ul className="flex flex-col items-start ">
            <li className="border-gray-400 w-full border-b-2 hover:bg-gray-400 hover:text-white pt-4">
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li className="border-gray-400 w-full border-b-2 hover:bg-gray-400 hover:text-white pt-4">
              <a href="#" onClick={toggleMenu}>
                About
              </a>
            </li>
            <li className="border-gray-400 w-full border-b-2 hover:bg-gray-400 hover:text-white pt-4">
              <a href="#" onClick={toggleMenu}>
                Contact
              </a>
            </li>
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={() => {
                navigate("/Login");
                toggleMenu();
              }}
              className="border border-gray-400 text-gray-400 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigate("/create");
                toggleMenu();
              }}
              className="border border-gray-400 text-gray-400 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;

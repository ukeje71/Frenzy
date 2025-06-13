import React from "react";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router";
import { CheckCircle2 } from "lucide-react";

const WishList = () => {
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>
      {/* Billing_details */}
      <section className="w-full p-4">
        <figure className="flex lg:hidden text-grey flex-row gap-3 mb-4 mt-4 text-gray-600">
          <NavLink to={"/"}>
            <p> Home</p>
          </NavLink>
          /
          <NavLink to={"/billing"}>
            <p> Address & Billing</p>
          </NavLink>
        </figure>
        <figure className="hidden text-gray-600 sm:flex flex-row md:gap-2 lg:gap-3 items-center mb-4">
          <NavLink to={"/cart"}>
            <p> Cart</p>
          </NavLink>
          <span className="flex flex-row items-center gap-2">
            <div className="w-6 h-0.5 bg-black"> </div>
            <CheckCircle2 fill="black" color="white" />
            <div className="w-6 h-0.5 bg-black"> </div>
          </span>
          <NavLink to={"/billing"}>
            <p>Billing & Address</p>
          </NavLink>
          <span className="flex flex-row items-center gap-2">
            <div className="w-6 h-0.5 bg-black"> </div>
            <CheckCircle2 fill="black" color="white" />
            <div className="w-6 h-0.5 bg-black"> </div>
          </span>
          <NavLink to={"/payement"}>
            <p> Payement</p>
          </NavLink>
        </figure>
      </section>
    </div>
  );
};

export default WishList;

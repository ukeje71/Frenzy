import React from "react";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router";

const Account = () => {
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar/>
      </section>

      {/* Billing_details */}
      <section className="w-full p-4">
        <figure className="flex  text-gray-600 flex-row gap-3 mb-4 mt-4">
          <NavLink to={"/"}>
            <p> Home</p>
          </NavLink>
          /
          <NavLink to={"/payement"}>
            <p> Address & Billing</p>
          </NavLink>
        </figure>
      </section>
    </div>
  );
};

export default Account;

import React from "react";
import Sidebar from "./components/Sidebar";
import { NavLink } from "react-router";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Billing_details */}
      <section className="w-full p-4">
        <figure className="flex text-grey flex-row gap-3 mb-4 mt-4 text-gray-600">
          <NavLink to={"/"}>
            <p> Home</p>
          </NavLink>
          /
          <NavLink to={"/contact"}>
            <p> Contact</p>
          </NavLink>
        </figure>

        <div className="mt-15">
          <span className=" text-2xl text-center">
            <h2 className=" uppercase font-bold">
              Let's talk about your problem
            </h2>
            <p className="text-gray-600 text-xl">
              Drop Us a line through the form and we will get back to you
            </p>
          </span>
          <form
            action="#"
            className="mt-10 text-gray-600 w-[60vw] m-auto flex flex-col gap-8"
          >
            <fieldset className="flex flex-row justify-between">
              <input
                type="text"
                placeholder="FirstName"
                className="text-gray-600 p-2 w-[45%]  outline-0 border-1 rounded-sm "
              />
              <input
                type="text*"
                placeholder="LastName*"
                className="text-gray-600 p-2 w-[45%]  outline-0 border-1  rounded-sm "
              />
            </fieldset>
            <input
              type="email"
              required
              placeholder="Email address*"
              className="outline-none border-1 rounded-sm p-2 w-full"
            />
            <textarea
              name="feedback"
              rows={4}
              placeholder="Pleasee tell us your problem ?*"
              id="feedback"
              className="p-2 resize-y border-1 rounded-sm outline-none"
            ></textarea>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

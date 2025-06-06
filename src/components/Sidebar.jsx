import { useState } from "react";
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  Calendar1,
  ChartSplineIcon,
  ChevronDown,
  CircleGaugeIcon,
  Landmark,
  MailOpenIcon,
  MessageSquareIcon,
  UserCircle,
} from "lucide-react";
// import React from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };
  return (
    <div className="md:w-full h-full border-r-gray-400 border-r-1 ">
      <section className="text-gray-600 pt-4 hidden md:block   px-4 pb-4">
        <h2 className=" font-bold text-2xl lg:uppercase">General</h2>
        <ul>
          <li className="flex flex-row items-center gap-4 mt-4">
            <CircleGaugeIcon />
            <p>App</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <BriefcaseIcon />
            <p>Ecommerce</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <ChartSplineIcon />
            <p>Analytics</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <Landmark />
            <p>Banking</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <BriefcaseBusiness />
            <p>Booking</p>
          </li>
        </ul>
        <ul>
          <h2 className=" font-bold text-2xl mt-4 lg:uppercase">Management</h2>
          <li className="flex flex-row items-center gap-4 mt-4">
            <UserCircle />
            <p>User</p>
          </li>
          <span className="relative inline-block text-left transition-transform duration-300 ease-in-out">
            <button
              onClick={toggleDropdown}
              className="font-semibold outline-none gap-4  flex flex-row mt-4"
            >
              <BriefcaseBusiness />
              <p>Admin</p>
              <ChevronDown />
            </button>

            {open && (
              <ul className="mt-2 bg-white rounded w-40 z-10 list-disc ">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer list-disc">
                  Shop
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Product
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Checkout
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Invoices
                </li>
              </ul>
            )}
          </span>
        </ul>

        <ul>
          <li className="flex flex-row items-center gap-4 mt-4">
            <MailOpenIcon />
            <p>App</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <MessageSquareIcon />
            <p>Ecommerce</p>
          </li>

          <li className="flex flex-row items-center gap-4 mt-4">
            <Calendar1 />
            <p>Ecommerce</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;

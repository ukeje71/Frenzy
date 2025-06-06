import { useState, useEffect } from "react";
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
import { NavLink } from "react-router";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${
        isMobile ? "hidden" : "block"
      } h-screen w-64 border-r border-gray-200 bg-white z-40`}
    >
      <section className="flex flex-col h-full">
        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 px-4 py-6">
          <h2 className="font-bold text-xl lg:text-2xl lg:uppercase mb-6">
            General
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <CircleGaugeIcon className="w-5 h-5" />
              <p className="text-sm lg:text-base">App</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <BriefcaseIcon className="w-5 h-5" />
              <p className="text-sm lg:text-base">Ecommerce</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartSplineIcon className="w-5 h-5" />
              <p className="text-sm lg:text-base">Analytics</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Landmark className="w-5 h-5" />
              <p className="text-sm lg:text-base">Banking</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <BriefcaseBusiness className="w-5 h-5" />
              <p className="text-sm lg:text-base">Booking</p>
            </li>
          </ul>

          <h2 className="font-bold text-xl lg:text-2xl lg:uppercase mt-8 mb-4">
            Management
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <UserCircle className="w-5 h-5" />
              <p className="text-sm lg:text-base">User</p>
            </li>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <BriefcaseBusiness className="w-5 h-5" />
                <p className="text-sm lg:text-base flex-1">Admin</p>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <ul className="ml-10 mt-1 space-y-1 bg-gray-50 rounded-lg p-2 animate-fadeIn">
                  <NavLink to={"/cart"}>
                    <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                      Shop
                    </li>
                  </NavLink>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Product
                  </li>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Checkout
                  </li>
                  <li className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors">
                    Invoices
                  </li>
                </ul>
              )}
            </div>
          </ul>

          <h2 className="font-bold text-xl lg:text-2xl mt-8 mb-4">Other</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <MailOpenIcon className="w-5 h-5" />
              <p className="text-sm lg:text-base">Mail</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquareIcon className="w-5 h-5" />
              <p className="text-sm lg:text-base">Messages</p>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar1 className="w-5 h-5" />
              <p className="text-sm lg:text-base">Calendar</p>
            </li>
          </ul>
        </div>

        {/* Optional footer area (non-scrollable) */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">© 2023 Frenzy</p>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;

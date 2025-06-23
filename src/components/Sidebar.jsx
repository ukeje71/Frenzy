import { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  Calendar1,
  ChartSplineIcon,
  ChevronDown,
  HomeIcon,
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
      } h-screen w-64 bg-white shadow-xl z-40 border-r border-gray-100`}
    >
      <section className="flex flex-col h-full">
        <div className="overflow-y-auto flex-1 px-4 py-6">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-green-600">Frenzy</span> Admin
            </h1>
          </div>

          <div className="space-y-8">
            {/* ================= GENERAL SECTION ================= */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                General
              </h2>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <HomeIcon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Dashboard</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/new"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <BriefcaseIcon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">New Product</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ChartSplineIcon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Analytics</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/banking"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Landmark
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Banking</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/booking"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <BriefcaseBusiness
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Booking</span>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* ================= MANAGEMENT SECTION ================= */}
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
                  >
                    {({ isActive }) => (
                      <>
                        <UserCircle
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
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
                        open ? "bg-gray-50" : "hover:bg-gray-50"
                      } text-gray-600`}
                    >
                      <BriefcaseBusiness
                        className={`w-5 h-5 ${
                          open
                            ? "text-green-600"
                            : "text-gray-500 group-hover:text-green-500"
                        }`}
                      />
                      <span className="text-sm font-medium flex-1 text-left">
                        Admin
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          open ? "rotate-180" : ""
                        } text-gray-400 group-hover:text-gray-600`}
                      />
                    </button>

                    {open && (
                      <ul className="ml-10 mt-1 space-y-1 bg-gray-50 rounded-lg p-2 animate-fadeIn">
                        {[
                          { to: "/", label: "Shop" },
                          { to: "/cart", label: "Cart" },
                          { to: "/wish", label: "Wishlist" },
                          { to: "/invoices", label: "Invoices" },
                        ].map(({ to, label }) => (
                          <li key={to}>
                            <NavLink
                              to={to}
                              className={({ isActive }) =>
                                `block px-3 py-1.5 text-sm rounded transition-colors ${
                                  isActive
                                    ? "bg-green-100 text-green-600"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`
                              }
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
            </div>

            {/* ================= OTHER SECTION ================= */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                Other
              </h2>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <MailOpenIcon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Mail</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <MessageSquareIcon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Messages</span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/calendar"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Calendar1
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-green-600"
                              : "text-gray-500 group-hover:text-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium">Calendar</span>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} Frenzy Dashboard
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;

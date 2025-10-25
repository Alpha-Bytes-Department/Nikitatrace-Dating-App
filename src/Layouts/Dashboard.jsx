import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  RiNotification4Line,
  RiSettings4Line,
  RiEyeLine,
} from "react-icons/ri";
import { PiMoney } from "react-icons/pi";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { FaRightFromBracket } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { removeAuthTokens } from "../lib/cookie-utils";
import logo from "../assets/logo/logo.svg";

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
      <div className="bg-[#FFFEF0] text-center rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full text-red-500 bg-[#FFF1CF]">
          <FaRightFromBracket className="text-3xl text-[#CE8B38]" />
        </div>
        <h2 className="text-lg font-semibold text-black mt-5">{title}</h2>
        <p className="mt-2 text-sm text-black">{message}</p>
        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FFF1CE] w-full text-black rounded-md hover:bg-gray-200 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#CE8B38] w-full text-white rounded-md hover:bg-[#b57730] transition-colors duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    removeAuthTokens();
    navigate("/signin");
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  const iconMappings = {
    Home: LuLayoutDashboard,
    User: LuUsers,
    Settings: RiSettings4Line,
    Eye: RiEyeLine,
    Money: PiMoney,
    Notification: RiNotification4Line,
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: iconMappings.Home,
      role: "admin",
      gap: true,
    },
    {
      title: "User",
      path: "/user",
      icon: iconMappings.User,
      role: "admin",
    },
    {
      title: "Subscriber",
      path: "/subscription",
      icon: iconMappings.Money,
      role: "admin",
    },
    {
      title: "Reports",
      path: "/reports",
      icon: iconMappings.Eye,
      role: "admin",
    },
    {
      title: "Setting",
      path: "/setting",
      icon: iconMappings.Settings,
      role: "admin",
    },
  ];

  const adminMenus = Menus.filter((menu) => menu.role === "admin");

  return (
    <div className="flex text-black">
      {/* Sidebar */}
      <div className="w-52 p-4 h-screen shadow-xl fixed left-0 top-0 bottom-0 z-50 pt-8 transition-all duration-500 bg-[#FCFDEC]">
        <div className="mb-7 flex items-center justify-center gap-x-2">
          <img
            src={logo}
            alt="Logo"
            className="cursor-pointer w-3/4 p-1 duration-500"
          />
        </div>

        <ul>
          {adminMenus.map((Menu, index) => (
            <Link
              to={Menu.path}
              key={index}
              className={`flex rounded-lg p-2 cursor-pointer text-sm items-center gap-x-4 mt-3 hover:shadow-lg duration-300 ${
                location.pathname === Menu.path
                  ? "text-white bg-[#CE8B38]"
                  : "bg-[#FFF1CE]"
              }`}
            >
              <li className="flex items-center gap-x-3 ps-2 text-md">
                <IconContext.Provider
                  value={{ className: "react-icon text-2xl" }}
                >
                  <Menu.icon />
                </IconContext.Provider>
                <span className="origin-left duration-200">{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="mt-28 bottom-0 absolute w-full border-t border-gray-200 bg-[#FFFEF0] -ms-4">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer text-sm items-center justify-center p-4 w-full py-7"
          >
            <li className="flex items-center justify-center gap-x-4 w-full bg-[#FFF1CE] p-2 rounded hover:shadow-lg duration-300">
              <FaRightFromBracket className="text-xl text-[#CE8B38]" />
              <span className="origin-left duration-200">Logout</span>
            </li>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="pl-56 text-black p-8 ms-3 flex-1 overflow-y-auto bg-[#FFFEF0] transition-all duration-500 h-[100vh]"
      >
        <Outlet />
      </div>

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Are you sure?"
        message="You want to logout?"
      />
    </div>
  );
};

export default Dashboard;
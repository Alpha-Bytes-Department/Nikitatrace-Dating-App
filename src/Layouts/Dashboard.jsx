import logo from "../assets/logo/logo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  RiNotification4Line,
  RiSettings4Line,
  RiEyeLine,
} from "react-icons/ri";
import { PiMoney } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRightFromBracket } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";

const Dashboard = () => {
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out");
      }
    });
  };

  const iconMappings = {
    Home: LuLayoutDashboard,
    User: LuUsers,
    Settings: RiSettings4Line,
    Eye: RiEyeLine,
    Money: PiMoney,
    Challenge: RiNotification4Line ,
    Notification: RiNotification4Line ,
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
      title: "Ads",
      path: "/private",
      icon: iconMappings.Eye,
      role: "admin",
    },
    {
      title: "Notification",
      path: "/announcement",
      icon: iconMappings.Notification,
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
            alt="logo"
            className={`cursor-pointer w-3/4 p-1 duration-500`}
          />
        </div>

        <ul
          className={`${
            open ? "" : "flex flex-col items-center justify-center"
          }`}
        >
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
                <span className={`origin-left duration-200`}>{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="mt-28 bottom-10 absolute w-full border-t border-gray-200 -ms-4">
          <button
            onClick={handleLogout}
            className={`flex cursor-pointer text-sm items-center justify-center p-4 w-full pt-7`}
          >
            <li className="flex items-center justify-center gap-x-4 w-full bg-[#FFF1CE] p-2 rounded  hover:shadow-lg duration-300">
              <FaRightFromBracket className="text-xl text-red-500" />
              <span className={`origin-left duration-200`}>Logout</span>
            </li>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`pl-56 text-black p-8 ms-3 flex-1 overflow-y-auto bg-[#FFFEF0] transition-all duration-500 h-[100vh]`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

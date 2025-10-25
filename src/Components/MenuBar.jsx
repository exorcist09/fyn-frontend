import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { LogOutIcon, Menu, User, X } from "lucide-react";
import Sidebar from "./Sidebar";
const MenuBar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropDown(false);
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    };
  },[showDropDown]);
  return (
    <div className="flex items-center justify-between  gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* left side bar with menu buttons and logo*/}{" "}
      <div className="flex items-center  gap-3 lg:gap-1">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? <X className="text-2xl" /> : <Menu />}{" "}
        </button>
        {/* logo */}
        <div className="flex items-center gap-2 lg:ml-40">
          <img
            src={assets.logoblack}
            alt="Logo"
            className="h-14 w-25 object-contain"
          />
        </div>
      </div>
      {/* Right Side -- Avatar */}
      <div className="relative lg:mr-40" ref={dropDownRef}>
        <button
          onClick={() => setShowDropDown(!showDropDown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
        >
          <User className="text-gray-800" />
        </button>
        {/* add dropdownmenu */}
        {showDropDown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* User information DropDown */}
            <div className="px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-blue-800" />{" "}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.fullName || "UserName"}
                  </p>
                  <p className="text-xs text-gray-500 truncate"></p>{" "}
                </div>
              </div>
            </div>
            {/* drop down option --> change everything here --> even logout */}{" "}
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors.duration-150"
              >
                <LogOutIcon className="w-4 h-4 text-gray-500" />{" "}
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* mobile side menu */}
      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};
export default MenuBar;

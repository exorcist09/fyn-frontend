import Sidebar from "./Sidebar";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        setOpenSideMenu(false);
      }
    };
    if (openSideMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSideMenu]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Header */}
      <div className="max-[1080px]:flex hidden items-center justify-between bg-white border-b border-gray-200/50 py-4 px-4 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img src={assets.logoblack} alt="Logo" className="h-10 w-auto object-contain" />
        </div>
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
        </button>
      </div>

      {user && (
        <div className="flex bg-gray-300/30 flex-1 relative">
          {/* Desktop Sidebar */}
          <div className="max-[1080px]:hidden shrink-0">
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* Mobile Overlay Sidebar */}
          {openSideMenu && (
            <div className="fixed inset-0 bg-black/20 z-40 max-[1080px]:block hidden" />
          )}
          <div 
            ref={sideMenuRef}
            className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out max-[1080px]:block hidden
              ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* content on the right hand side */}
          <div className="grow mx-5 my-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

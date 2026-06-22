import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { UserRound, LogOutIcon } from "lucide-react";
import { SIDEBAR_DATA, assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200/50 p-5 sticky top-0 z-20 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 mt-2 justify-center">
        <img
          src={assets.logoblack}
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* menu items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {SIDEBAR_DATA.map((item, index) => {
          return (
            <button
              onClick={() => navigate(item.path)}
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-5 rounded-xl mb-2 transition-all duration-200
                ${activeMenu == item.label
                  ? "bg-gray-300 text-gray-900 font-medium shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <item.icon
                className={`text-[18px] ${activeMenu ? "text-gray-900" : "text-gray-500"
                  }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shrink-0 overflow-hidden">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserRound className="w-5 h-5 text-gray-800" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.fullName || "User Name"}
              </p>
            </div>
          </button>
          
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-150 font-medium"
          >
            <LogOutIcon className="w-5 h-5 text-red-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div>
          <p className="text-sm text-gray-600">Are you sure you want to log out?</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Sidebar;

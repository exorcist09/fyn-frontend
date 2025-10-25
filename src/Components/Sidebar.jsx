import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDEBAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-64 h-[calc(100-vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* menu items */}
      <div className="p-5 flex-1">
        {SIDEBAR_DATA.map((item, index) => {
          return (
            <button
              onClick={() => navigate(item.path)}
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-5 rounded-xl mb-2 transition-all duration-200
                ${
                  activeMenu == item.label
                    ? "bg-gray-300 text-gray-900 font-medium shadow-sm"
                    : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                }`}
            >
              <item.icon
                className={`text-[18px] ${
                  activeMenu ? "text-gray-900" : "text-gray-500"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* profile section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-37 mb-7 ">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="profileImage"
            className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
            <User className="w-8 h-8 text-gray-500" />
          </div>
        )}
        <h5 className="text-gray-900 font-semibold text-sm">
          {user?.fullName || "FullName"}
        </h5>
      </div>
    </div>
  );
};
export default Sidebar;

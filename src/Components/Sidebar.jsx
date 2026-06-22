import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDEBAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-64 h-[calc(100vh-88px)] bg-white border-r border-gray-200/50 p-5 sticky top-[88px] z-20 flex flex-col overflow-hidden">
      {/* menu items */}
      <div className="p-5 flex-1">
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
    </div>
  );
};
export default Sidebar;

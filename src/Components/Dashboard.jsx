import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <MenuBar activeMenu={activeMenu} />
      
      {user && (
      <div className="flex bg-gray-300/30">
        <div className="max-[1080px]:hidden">
          <Sidebar activeMenu={activeMenu} />
        </div>
        {/* content on the right hand side */}
        <div className="grow mx-5 ">{children}</div>
      </div>
      )} 
    </div>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import {BadgeIndianRupee, BanknoteArrowDown,  WalletMinimal} from "lucide-react";
import {addThousandsSeparator} from "../util/util.js";
import Dashboard from "../Components/Dashboard";
import InfoCard from "../Components/InfoCard";
import RecentTransactions from "../Components/RecentTransactions";
import FinanceOverview from "../Components/FinanceOverview";
import Transactions from "../Components/Transactions"
import axiosConfig from "../util/axiosconfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";


const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error(
        "Something went wrong while fetching dashboard data:",
        error
      );
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Overview">
        <div className="my-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Display the cards*/}
            <InfoCard
              icon={<BadgeIndianRupee  />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-blue-800"
            />
            <InfoCard
              icon={<WalletMinimal  />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<BanknoteArrowDown  />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-purple-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 mt-6">
            {/* Recent transactions */}
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onMore={() => navigate("/expense")}
            />

            {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-[2px] h-[95%] bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
            </div>
            <div className="md:hidden flex justify-center -my-3">
              <div className="w-11/12 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>

            {/* finance overview chart */}
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            {/* Faded Horizontal Divider (Row separator) */}
            <div className="col-span-1 md:col-span-3 flex justify-center -my-3">
              <div className="w-11/12 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>

            {/* Expense transactions */}
            <Transactions
              transactions={dashboardData?.recent5Expenses || []}
              onMore={() => navigate("/expense")}
              type="expense"
              title="Recent Expenses"
            />

            {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-[2px] h-[95%] bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
            </div>
            <div className="md:hidden flex justify-center -my-3">
              <div className="w-11/12 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>

            {/* Income transactions */}
            <Transactions
              transactions={dashboardData?.recent5Incomes || []}
              onMore={() => navigate("/income")}
              type="income"
              title="Recent Incomes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;

import CustomPieChart from "./CustomPieChart.jsx";
import {addThousandsSeparator} from "../util/util.js";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense, isLoading}) => {
    // Colors matching bg-blue-800, bg-purple-800, bg-green-800
    const COLORS = ["#1e40af", "#6b21a8", "#166534"];

    const isEmpty = totalBalance === 0 && totalExpense === 0 && totalIncome === 0;

    const balanceData = isEmpty ? [
        { name: "No Data", amount: 1 }
    ] : [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    const chartColors = isEmpty ? ["#e5e7eb"] : COLORS;

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center mt-8 animate-pulse">
                    <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
                </div>
            ) : (
                <CustomPieChart
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                    colors={chartColors}
                    showTextAnchor
                />
            )}
        </div>
    )
}

export default FinanceOverview;
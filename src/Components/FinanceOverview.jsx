import CustomPieChart from "./CustomPieChart.jsx";
import {addThousandsSeparator} from "../util/util.js";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ["#59168B", "#a0090e", "#016630"];

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
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={chartColors}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;
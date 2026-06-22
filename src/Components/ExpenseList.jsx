import moment from "moment";
import {ArrowUpDown, ReceiptText} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import {useState} from "react";
import EmptyState from "./EmptyState";

const ExpenseList = ({transactions, onDelete, isLoading}) => {
    const [sortOption, setSortOption] = useState("latest");

    const sortedTransactions = transactions ? [...transactions].sort((a, b) => {
        if (sortOption === "highest") return b.amount - a.amount;
        if (sortOption === "lowest") return a.amount - b.amount;
        return new Date(b.date) - new Date(a.date);
    }) : [];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Expenses</h5>
                <div className="flex items-center justify-end gap-2">
                    <div className="relative flex items-center bg-gray-100 border border-gray-300 rounded-lg px-2 py-1.5 hover:bg-gray-200 transition-colors">
                        <ArrowUpDown size={15} className="text-gray-600 mr-2" />
                        <select 
                            value={sortOption} 
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-transparent text-sm font-medium outline-none cursor-pointer text-gray-700"
                        >
                            <option value="latest">Latest</option>
                            <option value="highest">Highest Amount</option>
                            <option value="lowest">Lowest Amount</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <div className="relative mt-2">
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent -translate-x-1/2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 animate-pulse">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !transactions || transactions.length === 0 ? (
                    <EmptyState
                        icon={ReceiptText}
                        message="No expenses found"
                        subMessage="Your added expenses will appear here"
                    />
                ) : (
                    <div className="relative mt-2">
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent -translate-x-1/2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {sortedTransactions.map((expense) => (
                                <TransactionInfoCard
                                    key={expense.id}
                                    title={expense.name}
                                    icon={expense.icon}
                                    date={moment(expense.date).format("Do MMM YYYY")}
                                    amount={expense.amount}
                                    type="expense"
                                    onDelete={() => onDelete(expense.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;

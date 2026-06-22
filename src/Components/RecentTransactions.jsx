import { ArrowRight, ReceiptText } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import EmptyState from "./EmptyState";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>

        <button
          onClick={onMore}
          className="text-blue-600 font-medium flex items-center gap-2 transition-all duration-200 hover:text-blue-800 hover:translate-x-1"
        >
          More <ArrowRight className="text-blue-600" size={15} />
        </button>
      </div>

      <div className="mt-6 flex-1 flex flex-col">
        {!transactions || transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            message="No transactions yet"
            subMessage="Your recent transactions will appear here"
          />
        ) : (
          transactions?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

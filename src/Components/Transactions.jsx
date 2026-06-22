import { ArrowRight, ReceiptText } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import EmptyState from "./EmptyState";

const Transactions = ({ transactions, onMore, type, title, isLoading }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button
          onClick={onMore}
          className="text-blue-600 font-medium flex items-center gap-2 transition-all duration-200 hover:text-blue-800 hover:translate-x-1"
        >
          More <ArrowRight className="text-blue-600" size={15} />
        </button>
      </div>

      <div className="mt-6 flex-1 flex flex-col">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 mb-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
          ))
        ) : !transactions || transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            message={`No ${title.toLowerCase()} found`}
            subMessage={`Your recent ${title.toLowerCase()} will appear here`}
          />
        ) : (
          transactions?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={type}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;

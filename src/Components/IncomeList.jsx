import {Download, LoaderCircle, Mail, ReceiptText} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";
import EmptyState from "./EmptyState";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [loading, setLoading] = useState(false);
    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button disabled={loading} className="add-btn bg-green-700add-btn bg-green-800/70 font-semibold text-white p-2  cursor-pointer rounded flex items-center gap-1" onClick={handleEmail}>
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Emailing...
                            </>
                        ): (
                            <>
                                <Mail size={15} className="text-base" />
                                Email
                            </>
                        )}
                    </button>
                    
                </div>
            </div>

            <div className="mt-6">
                {/* display the incomes */}
                {!transactions || transactions.length === 0 ? (
                    <EmptyState
                        icon={ReceiptText}
                        message="No income records found"
                        subMessage="Your added income sources will appear here"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {transactions?.map((income) => (
                            <TransactionInfoCard
                                key={income.id}
                                title={income.name}
                                icon={income.icon}
                                date={moment(income.date).format('Do MMM YYYY')}
                                amount={income.amount}
                                type="income"
                                onDelete={() => onDelete(income.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default IncomeList;
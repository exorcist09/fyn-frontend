const InfoCard = ({icon, label, value, color, isLoading}) => {
    if (isLoading) {
        return (
            <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-300 animate-pulse">
                <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                <div className="flex-1 py-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }
    return(
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-300">
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
                <span className="text-[22px]">&#8377;{value}</span>
            </div>
        </div>
    )
}

export default InfoCard;
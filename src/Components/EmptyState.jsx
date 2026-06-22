import React from "react";

const EmptyState = ({ icon: Icon, message, subMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 m-4 h-full min-h-[200px]">
      {Icon && (
        <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <Icon size={24} />
        </div>
      )}
      <p className="text-gray-900 font-medium">{message || "No data available"}</p>
      {subMessage && <p className="text-sm text-gray-500 mt-1">{subMessage}</p>}
    </div>
  );
};

export default EmptyState;

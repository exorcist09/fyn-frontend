import {Blocks, Layers2, Pencil, ListChecks} from "lucide-react";
import EmptyState from "./EmptyState";

const CategoryList = ({categories, onEditCategory, isLoading}) => {
    return (
        <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-600">Add multiple sources of your income and expenses</h4>
            </div>

            {/* Category list */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="group relative flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-200 animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (!categories || categories.length === 0) ? (
                <EmptyState
                    icon={ListChecks}
                    message="No categories found"
                    subMessage="Add categories to start tracking"
                />
            ): (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-300 hover:shadow-md transition-shadow">
                            {/* Icon/Emoji disply*/}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="h-5 w-5" />
                                    </span>
                                ): (
                                    <Blocks className="text-blue-700" size={24} />
                                )}
                            </div>


                            {/* Category Details*/}
                            <div className="flex-1 flex items-center justify-between">
                                {/* Category name and type*/}
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>
                                {/* Action buttons*/}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryList;
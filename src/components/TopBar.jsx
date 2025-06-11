import { Search, Plus } from "lucide-react";

const Topbar = ({
  title,
  showSearch = false,
  showAddButton = false,
  addButtonText = "Add",
  onAddClick,
  onSearchChange,
  currentMonth = "October",
  currentYear = "2023",
}) => {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-[#111827]">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search in table..."
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="p-1 hover:bg-gray-100 rounded">
            <span>‹</span>
          </button>
          <span className="px-3 py-1">
            {currentMonth} {currentYear}
          </span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <span>›</span>
          </button>
        </div>

        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {addButtonText}
          </button>
        )}

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hi Lwazi</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">L</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

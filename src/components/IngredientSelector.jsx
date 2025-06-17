const IngredientSelector = ({
  ingredient,
  index,
  inventoryItems,
  invLoading,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-end">
      <div className="col-span-6">
        <label className="block text-sm font-medium mb-1">Inventory Item</label>
        <select
          value={ingredient.inventoryItemId}
          onChange={(e) => onUpdate(index, "inventoryItemId", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-2"
        >
          <option value="">
            {invLoading ? "Loading items..." : "Select item"}
          </option>
          {inventoryItems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.itemName} ({item.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-4">
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          step="0.1"
          value={ingredient.quantity || ""}
          onChange={(e) => onUpdate(index, "quantity", Number(e.target.value))}
          placeholder="0"
          min="0"
          className="w-full border border-gray-300 rounded-md px-2 py-2"
        />
      </div>

      <div className="col-span-2 flex justify-end items-center">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 text-lg font-bold hover:text-red-800"
          title="Remove ingredient"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default IngredientSelector;

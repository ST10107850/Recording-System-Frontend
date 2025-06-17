import IngredientSelector from "./IngredientSelector";

const IngredientsSection = ({
  ingredients,
  inventoryItems,
  invLoading,
  onAddIngredient,
  onUpdateIngredient,
  onRemoveIngredient,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="font-medium text-sm">Ingredients</label>
        <button
          type="button"
          onClick={onAddIngredient}
          disabled={invLoading || inventoryItems.length === 0}
          className="border border-gray-300 text-sm px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ＋ Add Ingredient
        </button>
      </div>

      {ingredients.map((ingredient, index) => (
        <IngredientSelector
          key={index}
          ingredient={ingredient}
          index={index}
          inventoryItems={inventoryItems}
          invLoading={invLoading}
          onUpdate={onUpdateIngredient}
          onRemove={onRemoveIngredient}
        />
      ))}
    </div>
  );
};

export default IngredientsSection;

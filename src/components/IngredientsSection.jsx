import IngredientSelector from "./IngredientSelector";

const IngredientsSection = ({
  ingredients,
  inventoryItems,
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
          className="border border-gray-300 text-sm px-3 py-1 rounded-md hover:bg-gray-100 flex items-center"
        >
          <span className="mr-1">＋</span> Add Ingredient
        </button>
      </div>

      {ingredients.map((ingredient, index) => (
        <IngredientSelector
          key={index}
          ingredient={ingredient}
          index={index}
          inventoryItems={inventoryItems}
          onUpdate={onUpdateIngredient}
          onRemove={onRemoveIngredient}
        />
      ))}
    </div>
  );
};

export default IngredientsSection;
